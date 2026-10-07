import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { ProjectWithStats } from "@/lib/domain/types";
import { PlanFact } from "./plan-fact";

export function ProjectCard({ project }: { project: ProjectWithStats }) {
  return (
    <Link href={`/analysis/${project.id}`} className="group block">
      <Card className="h-full transition group-hover:border-zinc-400 group-hover:shadow">
        <h3 className="mb-4 font-medium">{project.name}</h3>
        <PlanFact project={project} />
      </Card>
    </Link>
  );
}
