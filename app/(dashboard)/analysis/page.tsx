import type { Metadata } from "next";
import { ProjectsTable } from "@/components/projects/projects-table";
import { getActiveProjects } from "@/lib/data";

export const metadata: Metadata = { title: "Анализ" };

export default async function AnalysisPage() {
  const projects = await getActiveProjects();
  return <ProjectsTable projects={projects} />;
}
