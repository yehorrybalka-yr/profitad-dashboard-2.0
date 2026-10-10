import type {
  Kpi,
  KpiStats,
  Metrics,
  Project,
  ProjectStats,
  ProjectWithStats,
  StatusSummary,
} from "./types";
import { PROJECT_STATUSES } from "./types";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const safeDivide = (a: number, b: number) => (b === 0 ? 0 : a / b);

function computeKpiStats(kpi: Kpi, metrics: Metrics, elapsed: number): KpiStats {
  const fact = metrics[kpi.metric] ?? 0;
  const forecast = elapsed > 0 ? fact / elapsed : 0;
  const hasData = metrics[kpi.metric] !== undefined;
  const hasPlan = kpi.plan !== null && kpi.plan > 0;
  const canJudge = hasData && hasPlan;
  const spend = metrics.spend;

  return {
    kpi,
    fact,
    forecast,
    progress: canJudge ? fact / kpi.plan! : null,
    pace: canJudge ? forecast / kpi.plan! : null,
    cpaFact: spend !== undefined && fact > 0 ? spend / fact : null,
  };
}

export function computeStats(project: Project, now: Date): ProjectStats {
  const start = Date.parse(project.period.start);
  // The end date is inclusive: the period lasts until the end of that day.
  const end = Date.parse(project.period.end) + 86_400_000;
  const elapsed = clamp(safeDivide(now.getTime() - start, end - start), 0, 1);
  const results = project.kpis.map((kpi) => computeKpiStats(kpi, project.metrics, elapsed));

  return { elapsed, results, primary: results[0] ?? null };
}

export function withStats(project: Project, now: Date): ProjectWithStats {
  return { ...project, stats: computeStats(project, now) };
}

export function summarizeStatuses(projects: Project[]): StatusSummary {
  const summary = Object.fromEntries(
    PROJECT_STATUSES.map((status) => [status, 0]),
  ) as StatusSummary;
  for (const project of projects) summary[project.status] += 1;
  return summary;
}

/** "none" = nothing to judge yet (no plan set or no synced data). */
export type PaceLevel = "good" | "warning" | "bad" | "none";

export function paceLevel(pace: number | null | undefined): PaceLevel {
  if (pace === null || pace === undefined) return "none";
  if (pace >= 1) return "good";
  if (pace >= 0.85) return "warning";
  return "bad";
}
