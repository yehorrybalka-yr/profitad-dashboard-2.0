import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { ProjectWithStats } from "@/lib/domain/types";
import { formatCurrency, formatPercent } from "@/lib/format";

function Item({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="min-w-0">
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-1 truncate text-lg font-semibold tabular-nums">{value}</div>
      {hint && <div className="text-xs text-muted">{hint}</div>}
    </div>
  );
}

export function KpiStrip({ project }: { project: ProjectWithStats }) {
  const { kpi, stats } = project;
  const cpaPlan = kpi.cpaPlan;
  const cpaDelta =
    cpaPlan && stats.cpaFact !== null ? (stats.cpaFact - cpaPlan) / cpaPlan : null;

  return (
    <Card className="grid grid-cols-2 gap-6 md:grid-cols-4">
      <Item label="Цель" value={project.goal} />
      <Item label="CPA план" value={cpaPlan ? formatCurrency(cpaPlan) : "—"} />
      <Item
        label="CPA факт"
        value={stats.cpaFact !== null ? formatCurrency(stats.cpaFact) : "—"}
        hint={
          cpaDelta !== null
            ? `${cpaDelta > 0 ? "+" : ""}${formatPercent(cpaDelta)} к плану`
            : undefined
        }
      />
      <div>
        <Item
          label="Выполнение · темп"
          value={`${formatPercent(stats.progress)} · ${formatPercent(stats.pace)}`}
        />
        <div className="mt-2">
          <ProgressBar value={stats.progress} marker={stats.elapsed} pace={stats.pace} />
        </div>
      </div>
    </Card>
  );
}
