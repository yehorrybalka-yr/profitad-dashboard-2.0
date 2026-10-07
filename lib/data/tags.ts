/** Cache tags. Integrations and automations invalidate data through these. */
export const TAGS = {
  projects: "projects",
  project: (id: string) => `project:${id}`,
} as const;
