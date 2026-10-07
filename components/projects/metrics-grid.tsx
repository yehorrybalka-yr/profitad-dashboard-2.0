import { Card } from "@/components/ui/card";
import { DERIVED_METRICS, METRICS } from "@/lib/domain/metrics";
import { METRIC_KEYS, type Metrics } from "@/lib/domain/types";
import { formatMetric } from "@/lib/format";

export function MetricsGrid({ metrics }: { metrics: Metrics }) {
  const items = [
    ...METRIC_KEYS.map((key) => ({
      key,
      label: METRICS[key].label,
      value: formatMetric(metrics[key], METRICS[key].format),
    })),
    ...DERIVED_METRICS.map((m) => ({
      key: m.key,
      label: m.label,
      value: formatMetric(m.compute(metrics), m.format),
    })),
  ];

  return (
    <Card>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => (
          <div key={item.key}>
            <div className="text-xs text-muted">{item.label}</div>
            <div className="mt-1 font-semibold tabular-nums">{item.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
