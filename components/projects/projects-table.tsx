import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Delta, SIGNAL_TEXT } from "@/components/ui/signal";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/cn";
import { paceLevel } from "@/lib/domain/stats";
import type { ProjectWithStats } from "@/lib/domain/types";
import { formatNumber, formatPercent } from "@/lib/format";

export function ProjectsTable({ projects }: { projects: ProjectWithStats[] }) {
  return (
    <Card className="min-w-0 overflow-hidden">
      <h2 className="section-title">Активные проекты</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-y-1 text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="px-4 pb-2 font-medium">Название</th>
              <th className="px-4 pb-2 font-medium">Статус</th>
              <th className="px-4 pb-2 font-medium">План / факт</th>
              <th className="px-4 pb-2 font-medium">Цель</th>
              <th className="w-64 px-4 pb-2 font-medium">Выполнение · темп</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => {
              const level = paceLevel(p.stats.pace);
              return (
                <tr key={p.id} className="group">
                  <td className="rounded-l-[18px] bg-background/70 px-4 py-3 font-semibold tracking-[-0.02em] transition-colors group-hover:bg-muted">
                    <Link href={`/analysis/${p.id}`} className="hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="bg-background/70 px-4 py-3 transition-colors group-hover:bg-muted">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="bg-background/70 px-4 py-3 tabular-nums transition-colors group-hover:bg-muted">
                    <span className="font-semibold">{formatNumber(p.stats.fact)}</span>
                    <span className="text-muted-foreground"> / {formatNumber(p.kpi.plan)}</span>
                  </td>
                  <td className="bg-background/70 px-4 py-3 text-muted-foreground transition-colors group-hover:bg-muted">
                    {p.goal}
                  </td>
                  <td className="rounded-r-[18px] bg-background/70 px-4 py-3 transition-colors group-hover:bg-muted">
                    <div className="flex items-center justify-between gap-2 text-xs tabular-nums">
                      <span className={cn("font-semibold", SIGNAL_TEXT[level])}>
                        {formatPercent(p.stats.progress)}
                      </span>
                      <Delta value={p.stats.pace - 1} />
                    </div>
                    <ProgressBar
                      className="mt-2"
                      value={p.stats.progress}
                      marker={p.stats.elapsed}
                      pace={p.stats.pace}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
