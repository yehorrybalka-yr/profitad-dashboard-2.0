import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Delta } from "@/components/ui/signal";
import type { ProjectWithStats } from "@/lib/domain/types";
import { PlanFact } from "./plan-fact";

export function ProjectCard({ project }: { project: ProjectWithStats }) {
  return (
    <Link href={`/analysis/${project.id}`} className="group block">
      <Card className="h-full transition-transform duration-200 group-hover:scale-[1.015]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="truncate text-[15px] font-semibold tracking-[-0.02em]">{project.name}</h3>
          <Delta value={project.stats.pace - 1} suffix="к плану" />
        </div>
        <PlanFact project={project} />
      </Card>
    </Link>
  );
}
