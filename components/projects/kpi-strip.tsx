import { Card, StatTile } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Delta, SIGNAL_TEXT } from "@/components/ui/signal";
import { cn } from "@/lib/cn";
import { paceLevel } from "@/lib/domain/stats";
import type { ProjectWithStats } from "@/lib/domain/types";
import { formatCurrency, formatPercent } from "@/lib/format";

export function KpiStrip({ project }: { project: ProjectWithStats }) {
  const { kpi, stats } = project;
  const cpaPlan = kpi.cpaPlan;
  const cpaDelta = cpaPlan && stats.cpaFact !== null ? (stats.cpaFact - cpaPlan) / cpaPlan : null;
  const level = paceLevel(stats.pace);

  return (
    <Card className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatTile label="Цель">{project.goal}</StatTile>
      <StatTile label="CPA план">{cpaPlan ? formatCurrency(cpaPlan) : "—"}</StatTile>
      <StatTile label="CPA факт">
        <div className="flex flex-wrap items-center gap-2">
          {stats.cpaFact !== null ? formatCurrency(stats.cpaFact) : "—"}
          {cpaDelta !== null ? <Delta value={cpaDelta} goodWhen="down" /> : null}
        </div>
      </StatTile>
      <StatTile label="Выполнение · темп">
        <span className={cn(SIGNAL_TEXT[level])}>
          {formatPercent(stats.progress)} · {formatPercent(stats.pace)}
        </span>
        <ProgressBar className="mt-2" value={stats.progress} marker={stats.elapsed} pace={stats.pace} />
      </StatTile>
    </Card>
  );
}
