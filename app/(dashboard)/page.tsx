import { StatusSummary } from "@/components/dashboard/status-summary";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionTitle } from "@/components/ui/card";
import { PageHeader, Placeholder } from "@/components/ui/page-header";
import { getActiveProjects, getStatusSummary } from "@/lib/data";

export default async function DashboardPage() {
  const [summary, activeProjects] = await Promise.all([
    getStatusSummary(),
    getActiveProjects(),
  ]);

  return (
    <>
      <PageHeader title="Дашборд" />

      <section className="mb-10">
        <StatusSummary summary={summary} />
      </section>

      <section>
        <SectionTitle>Активные проекты</SectionTitle>
        {activeProjects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {activeProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <Placeholder>Активных проектов пока нет</Placeholder>
        )}
      </section>
    </>
  );
}
