export const PROJECT_STATUSES = [
  "active",
  "awaiting_feedback",
  "awaiting_offer",
  "need_contact",
  "paused",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const METRIC_KEYS = [
  "spend",
  "impressions",
  "clicks",
  "leads",
  "sales",
  "revenue",
] as const;

export type MetricKey = (typeof METRIC_KEYS)[number];

export type Metrics = Partial<Record<MetricKey, number>>;

/** ISO date string, `YYYY-MM-DD`. */
export type IsoDate = string;

export interface Kpi {
  /** Metric the plan is measured in (e.g. leads or sales). */
  metric: MetricKey;
  plan: number;
  /** Target cost per KPI unit. */
  cpaPlan?: number;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  goal: string;
  period: { start: IsoDate; end: IsoDate };
  kpi: Kpi;
  metrics: Metrics;
}

export interface ProjectStats {
  fact: number;
  /** fact / plan, 0..n */
  progress: number;
  /** Share of the period already elapsed, 0..1 */
  elapsed: number;
  /** Projected KPI value at the end of the period at the current pace. */
  forecast: number;
  /** forecast / plan; 1 means on track. */
  pace: number;
  cpaFact: number | null;
}

export interface ProjectWithStats extends Project {
  stats: ProjectStats;
}

export type StatusSummary = Record<ProjectStatus, number>;
