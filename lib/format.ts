import { APP_CONFIG } from "@/config/app";
import type { MetricFormat } from "@/lib/domain/metrics";

const numberFmt = new Intl.NumberFormat(APP_CONFIG.locale, { maximumFractionDigits: 0 });
const currencyFmt = new Intl.NumberFormat(APP_CONFIG.locale, {
  style: "currency",
  currency: APP_CONFIG.currency,
  maximumFractionDigits: 2,
});
const percentFmt = new Intl.NumberFormat(APP_CONFIG.locale, {
  style: "percent",
  maximumFractionDigits: 0,
});
const dateFmt = new Intl.DateTimeFormat(APP_CONFIG.locale, { day: "numeric", month: "short" });

export const formatNumber = (v: number) => numberFmt.format(v);
export const formatCurrency = (v: number) => currencyFmt.format(v);
export const formatPercent = (v: number) => percentFmt.format(v);
export const formatDate = (iso: string) => dateFmt.format(new Date(iso));

export function formatMetric(value: number | null | undefined, format: MetricFormat) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  switch (format) {
    case "currency":
      return formatCurrency(value);
    case "percent":
      return formatPercent(value);
    default:
      return formatNumber(value);
  }
}
