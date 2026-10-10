import { DERIVED_METRICS, METRICS, PLATFORM_LABELS } from "@/lib/domain/metrics";
import { STATUS_META } from "@/lib/domain/statuses";
import type { MetricKey, ProjectWithStats } from "@/lib/domain/types";

/**
 * Compact, model-friendly snapshot of a project. The future AI assistant
 * receives exactly this object, so UI changes never affect prompts.
 */
export function buildProjectContext(project: ProjectWithStats) {
  const raw = Object.fromEntries(
    (Object.keys(project.metrics) as MetricKey[]).map((key) => [
      METRICS[key].label,
      project.metrics[key],
    ]),
  );
  const derived = Object.fromEntries(
    DERIVED_METRICS.map((m) => [m.label, m.compute(project.metrics)]),
  );

  return {
    project: project.name,
    status: STATUS_META[project.status].label,
    goal: project.goal,
    period: project.period,
    periodElapsed: project.stats.elapsed,
    trafficSources: project.sources.map((s) => ({
      platform: PLATFORM_LABELS[s.platform],
      connected: Boolean(s.accountId),
    })),
    results: project.stats.results.map((r) => ({
      metric: METRICS[r.kpi.metric].label,
      plan: r.kpi.plan,
      fact: r.fact,
      progress: r.progress,
      forecast: r.forecast,
      pace: r.pace,
      cpaPlan: r.kpi.cpaPlan,
      cpaFact: r.cpaFact,
    })),
    metrics: raw,
    derivedMetrics: derived,
    notes: project.notes,
  };
}

export type ProjectContext = ReturnType<typeof buildProjectContext>;
