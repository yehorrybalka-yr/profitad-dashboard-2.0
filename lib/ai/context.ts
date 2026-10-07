import { DERIVED_METRICS, METRICS } from "@/lib/domain/metrics";
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
    kpi: {
      metric: METRICS[project.kpi.metric].label,
      plan: project.kpi.plan,
      fact: project.stats.fact,
      progress: project.stats.progress,
      periodElapsed: project.stats.elapsed,
      forecast: project.stats.forecast,
      pace: project.stats.pace,
      cpaPlan: project.kpi.cpaPlan ?? null,
      cpaFact: project.stats.cpaFact,
    },
    metrics: raw,
    derivedMetrics: derived,
  };
}

export type ProjectContext = ReturnType<typeof buildProjectContext>;
