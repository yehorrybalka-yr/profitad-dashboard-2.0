import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KpiStrip } from "@/components/projects/kpi-strip";
import { MetricsGrid } from "@/components/projects/metrics-grid";
import { PlanFact } from "@/components/projects/plan-fact";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getProject, getProjects } from "@/lib/data";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ projectId: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/analysis/[projectId]">): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getProject(projectId);
  return { title: project?.name ?? "Проект" };
}

export default async function ProjectPage({ params }: PageProps<"/analysis/[projectId]">) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  if (!project) notFound();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3 px-1">
        <StatusBadge status={project.status} />
        <span className="text-sm text-muted-foreground">
          {formatDate(project.period.start)} — {formatDate(project.period.end)}
        </span>
      </div>

      <section className="grid gap-5 xl:grid-cols-[minmax(300px,1fr)_3fr]">
        <Card>
          <PlanFact project={project} />
        </Card>
        <KpiStrip project={project} />
      </section>

      <MetricsGrid metrics={project.metrics} />
    </div>
  );
}
