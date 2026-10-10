import type { Metadata } from "next";
import { ProjectsInputs } from "@/components/inputs/projects-inputs";
import { requireSection } from "@/lib/access/viewer";
import { getVisibleProjects } from "@/lib/data";

export const metadata: Metadata = { title: "Вводные" };

export default async function InputsPage() {
  const { permissions } = await requireSection("inputs");
  const projects = await getVisibleProjects(permissions);

  return (
    <div className="flex flex-col gap-3">
      {!permissions.canEditInputs && (
        <p className="rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
          Режим просмотра: редактирование «Вводных» недоступно для вашего уровня доступа.
        </p>
      )}
      <ProjectsInputs
        projects={projects.map(({ id, name, status, goal, period, kpis, sources, notes }) => ({
          id,
          name,
          status,
          goal,
          period,
          kpis,
          sources,
          notes,
        }))}
        canEdit={permissions.canEditInputs}
        canCreate={permissions.canEditInputs && permissions.projects === "all"}
        canDelete={permissions.canManageAccess}
      />
    </div>
  );
}
