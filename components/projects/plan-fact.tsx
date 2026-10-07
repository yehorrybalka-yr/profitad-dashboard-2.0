import { ProgressBar } from "@/components/ui/progress-bar";
import { SIGNAL_TEXT } from "@/components/ui/signal";
import { cn } from "@/lib/cn";
import { METRICS } from "@/lib/domain/metrics";
import { paceLevel } from "@/lib/domain/stats";
import type { ProjectWithStats } from "@/lib/domain/types";
import { formatNumber, formatPercent } from "@/lib/format";

export function PlanFact({ project }: { project: ProjectWithStats }) {
  const { kpi, stats } = project;
  const level = paceLevel(stats.pace);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            План / факт · {METRICS[kpi.metric].label.toLowerCase()}
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-[-0.045em] tabular-nums">
            {formatNumber(stats.fact)}
            <span className="text-muted-foreground"> / {formatNumber(kpi.plan)}</span>
          </p>
        </div>
        <p className={cn("text-2xl font-semibold tracking-[-0.045em] tabular-nums", SIGNAL_TEXT[level])}>
          {formatPercent(stats.progress)}
        </p>
      </div>
      <ProgressBar value={stats.progress} marker={stats.elapsed} pace={stats.pace} />
      <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
        <span>Прошло {formatPercent(stats.elapsed)} периода</span>
        <span>
          Темп <span className={cn("font-semibold", SIGNAL_TEXT[level])}>{formatPercent(stats.pace)}</span>
        </span>
      </div>
    </div>
  );
}
