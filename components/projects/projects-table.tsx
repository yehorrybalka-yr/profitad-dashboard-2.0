import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ProjectWithStats } from "@/lib/domain/types";
import { formatNumber, formatPercent } from "@/lib/format";

export function ProjectsTable({ projects }: { projects: ProjectWithStats[] }) {
  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
          <tr>
            <th className="px-5 py-3 font-medium">Название</th>
            <th className="px-5 py-3 font-medium">Статус</th>
            <th className="px-5 py-3 font-medium">План / факт</th>
            <th className="px-5 py-3 font-medium">Цель</th>
            <th className="w-56 px-5 py-3 font-medium">Выполнение · темп</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-zinc-50">
              <td className="px-5 py-3 font-medium">
                <Link href={`/analysis/${p.id}`} className="hover:underline">
                  {p.name}
                </Link>
              </td>
              <td className="px-5 py-3">
                <StatusBadge status={p.status} />
              </td>
              <td className="px-5 py-3 tabular-nums">
                {formatNumber(p.stats.fact)} / {formatNumber(p.kpi.plan)}
              </td>
              <td className="px-5 py-3 text-muted">{p.goal}</td>
              <td className="px-5 py-3">
                <ProgressBar value={p.stats.progress} marker={p.stats.elapsed} pace={p.stats.pace} />
                <div className="mt-1 flex justify-between text-xs text-muted tabular-nums">
                  <span>{formatPercent(p.stats.progress)}</span>
                  <span>темп {formatPercent(p.stats.pace)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
