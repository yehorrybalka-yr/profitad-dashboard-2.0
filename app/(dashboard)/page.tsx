import { StatusSummary } from "@/components/dashboard/status-summary";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionTitle } from "@/components/ui/card";
import { Placeholder } from "@/components/ui/page-header";
import { getActiveProjects, getStatusSummary } from "@/lib/data";

export default async function DashboardPage() {
  const [summary, activeProjects] = await Promise.all([getStatusSummary(), getActiveProjects()]);

  return (
    <div className="flex flex-col gap-8">
      <StatusSummary summary={summary} />

      <section>
        <SectionTitle kicker="Сейчас в работе">Активные проекты</SectionTitle>
        {activeProjects.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2 lg:gap-5 2xl:grid-cols-3">
            {activeProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <Placeholder>Активных проектов пока нет</Placeholder>
        )}
      </section>
    </div>
  );
}
