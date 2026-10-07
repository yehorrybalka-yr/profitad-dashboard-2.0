import { Card } from "@/components/ui/card";
import { DASHBOARD_STATUSES, STATUS_META } from "@/lib/domain/statuses";
import type { StatusSummary as Summary } from "@/lib/domain/types";

export function StatusSummary({ summary }: { summary: Summary }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {DASHBOARD_STATUSES.map((status) => (
        <Card key={status}>
          <div className="text-sm text-muted">{STATUS_META[status].summaryLabel}</div>
          <div className="mt-2 text-3xl font-semibold tabular-nums">{summary[status]}</div>
        </Card>
      ))}
    </div>
  );
}
