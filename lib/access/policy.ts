import {
  SECTIONS,
  type AccessGrant,
  type AssignableRole,
  type Permissions,
  type Role,
  type Section,
} from "./roles";

const WITHOUT_SALES = SECTIONS.filter((s) => s !== "sales");

export function permissionsFor(role: Role, grant?: AccessGrant | null): Permissions {
  switch (role) {
    case "admin":
    case "project_manager":
      return { role, sections: [...SECTIONS], projects: "all", canEditInputs: true, canManageAccess: true };
    case "marketer":
      return { role, sections: WITHOUT_SALES, projects: "all", canEditInputs: true, canManageAccess: false };
    case "reader":
      return { role, sections: WITHOUT_SALES, projects: "all", canEditInputs: false, canManageAccess: false };
    case "custom":
      return {
        role,
        sections: grant?.sections ?? [],
        projects: grant?.projectIds ?? "all",
        canEditInputs: Boolean(grant?.canEditInputs && grant.sections.includes("inputs")),
        canManageAccess: false,
      };
  }
}

/** Roles the actor may grant, edit or revoke. */
export function manageableRoles(actor: Role): AssignableRole[] {
  if (actor === "admin") return ["project_manager", "marketer", "reader", "custom"];
  if (actor === "project_manager") return ["marketer", "reader", "custom"];
  return [];
}

export function canManageRole(actor: Role, target: Role) {
  return target !== "admin" && (manageableRoles(actor) as Role[]).includes(target);
}

export const canViewSection = (p: Permissions, section: Section) => p.sections.includes(section);

export const canViewProject = (p: Permissions, projectId: string) =>
  p.projects === "all" || p.projects.includes(projectId);

export function visibleProjects<T extends { id: string }>(p: Permissions, projects: T[]): T[] {
  return p.projects === "all" ? projects : projects.filter((project) => canViewProject(p, project.id));
}

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
