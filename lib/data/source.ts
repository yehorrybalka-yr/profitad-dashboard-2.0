import type { Project } from "@/lib/domain/types";

/**
 * Contract every data provider implements (mock, database, ad-platform APIs, CRM...).
 * UI and cache layers depend only on this interface.
 */
export interface DataSource {
  listProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | null>;
}
