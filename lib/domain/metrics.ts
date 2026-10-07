import type { MetricKey, Metrics } from "./types";

export type MetricFormat = "number" | "currency" | "percent";

export interface MetricDefinition {
  label: string;
  format: MetricFormat;
}

export const METRICS: Record<MetricKey, MetricDefinition> = {
  spend: { label: "Расход", format: "currency" },
  impressions: { label: "Показы", format: "number" },
  clicks: { label: "Клики", format: "number" },
  leads: { label: "Лиды", format: "number" },
  sales: { label: "Продажи", format: "number" },
  revenue: { label: "Выручка", format: "currency" },
};

export interface DerivedMetric extends MetricDefinition {
  key: string;
  compute: (m: Metrics) => number | null;
}

const ratio = (a?: number, b?: number) =>
  a === undefined || b === undefined || b === 0 ? null : a / b;

/** Metrics calculated from raw ones. Add a new entry here and it shows up everywhere. */
export const DERIVED_METRICS: DerivedMetric[] = [
  { key: "ctr", label: "CTR", format: "percent", compute: (m) => ratio(m.clicks, m.impressions) },
  { key: "cpc", label: "CPC", format: "currency", compute: (m) => ratio(m.spend, m.clicks) },
  { key: "cpl", label: "CPL", format: "currency", compute: (m) => ratio(m.spend, m.leads) },
  { key: "cr", label: "CR лид → продажа", format: "percent", compute: (m) => ratio(m.sales, m.leads) },
  { key: "roas", label: "ROAS", format: "percent", compute: (m) => ratio(m.revenue, m.spend) },
];
