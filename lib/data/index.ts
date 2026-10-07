import { cacheLife, cacheTag } from "next/cache";
import { paceLevel, summarizeStatuses, withStats } from "@/lib/domain/stats";
import type { ProjectWithStats, StatusSummary } from "@/lib/domain/types";
import type { DataSource } from "./source";
import { mockSource } from "./sources/mock";
import { TAGS } from "./tags";

/** Swap this for a real provider (DB, ad platforms, CRM) — nothing else has to change. */
const source: DataSource = mockSource;

export async function getProjects(): Promise<ProjectWithStats[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(TAGS.projects);

  const now = new Date();
  const projects = await source.listProjects();
  return projects.map((p) => withStats(p, now));
}

export async function getProject(id: string): Promise<ProjectWithStats | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(TAGS.projects, TAGS.project(id));

  const project = await source.getProject(id);
  return project ? withStats(project, new Date()) : null;
}

export async function getActiveProjects() {
  const projects = await getProjects();
  return projects.filter((p) => p.status === "active");
}

export async function getStatusSummary(): Promise<StatusSummary> {
  return summarizeStatuses(await getProjects());
}

export async function getProjectNav() {
  const projects = await getProjects();
  return projects.map(({ id, name, status, stats }) => ({
    id,
    name,
    signal: status === "active" ? paceLevel(stats.pace) : null,
  }));
}
