import type { Metadata } from "next";
import { ProjectsTable } from "@/components/projects/projects-table";
import { requireSection } from "@/lib/access/viewer";
import { getActiveProjects } from "@/lib/data";

export const metadata: Metadata = { title: "Анализ" };

export default async function AnalysisPage() {
  const { permissions } = await requireSection("analysis");
  const projects = await getActiveProjects(permissions);
  return <ProjectsTable projects={projects} />;
}
