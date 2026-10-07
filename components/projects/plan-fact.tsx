import { ProgressBar } from "@/components/ui/progress-bar";
import { METRICS } from "@/lib/domain/metrics";
import type { ProjectWithStats } from "@/lib/domain/types";
import { formatNumber, formatPercent } from "@/lib/format";

export function PlanFact({ project }: { project: ProjectWithStats }) {
  const { kpi, stats } = project;
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="text-muted">
          План / факт · {METRICS[kpi.metric].label.toLowerCase()}
        </span>
        <span className="font-medium tabular-nums">
          {formatNumber(stats.fact)} / {formatNumber(kpi.plan)}
        </span>
      </div>
      <ProgressBar value={stats.progress} marker={stats.elapsed} pace={stats.pace} />
      <div className="flex justify-between text-xs text-muted tabular-nums">
        <span>Выполнение {formatPercent(stats.progress)}</span>
        <span>Темп {formatPercent(stats.pace)}</span>
      </div>
    </div>
  );
}
