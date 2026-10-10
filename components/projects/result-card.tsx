import { Card, StatTile } from "@/components/ui/card";
import { Delta } from "@/components/ui/signal";
import { METRICS } from "@/lib/domain/metrics";
import type { KpiStats } from "@/lib/domain/types";
import { formatCurrency } from "@/lib/format";
import { PlanFact } from "./plan-fact";

/** One tracked result: plan/fact with pace, plus target vs actual cost per result. */
export function ResultCard({ result, elapsed }: { result: KpiStats; elapsed: number }) {
  const { cpaPlan } = result.kpi;
  const cpaDelta = cpaPlan && result.cpaFact !== null ? (result.cpaFact - cpaPlan) / cpaPlan : null;
  const unit = METRICS[result.kpi.metric].label.toLowerCase();

  return (
    <Card className="flex min-w-0 flex-col gap-4">
      <PlanFact result={result} elapsed={elapsed} />
      <div className="grid grid-cols-2 gap-3">
        <StatTile label={`Цель по цене · ${unit}`}>{cpaPlan ? formatCurrency(cpaPlan) : "—"}</StatTile>
        <StatTile label="Факт цены">
          <div className="flex flex-wrap items-center gap-2">
            {result.cpaFact !== null ? formatCurrency(result.cpaFact) : "—"}
            {cpaDelta !== null ? <Delta value={cpaDelta} goodWhen="down" /> : null}
          </div>
        </StatTile>
      </div>
    </Card>
  );
}
