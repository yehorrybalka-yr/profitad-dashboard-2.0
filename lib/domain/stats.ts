import type {
  Project,
  ProjectStats,
  ProjectWithStats,
  StatusSummary,
} from "./types";
import { PROJECT_STATUSES } from "./types";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const safeDivide = (a: number, b: number) => (b === 0 ? 0 : a / b);

export function computeStats(project: Project, now: Date): ProjectStats {
  const { kpi, metrics, period } = project;
  const fact = metrics[kpi.metric] ?? 0;

  const start = Date.parse(period.start);
  const end = Date.parse(period.end);
  const elapsed = clamp(safeDivide(now.getTime() - start, end - start), 0, 1);

  const forecast = elapsed > 0 ? fact / elapsed : 0;
  const spend = metrics.spend;

  return {
    fact,
    progress: safeDivide(fact, kpi.plan),
    elapsed,
    forecast,
    pace: safeDivide(forecast, kpi.plan),
    cpaFact: spend !== undefined && fact > 0 ? spend / fact : null,
  };
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

export type PaceLevel = "good" | "warning" | "bad";

export function paceLevel(pace: number): PaceLevel {
  if (pace >= 1) return "good";
  if (pace >= 0.85) return "warning";
  return "bad";
}
