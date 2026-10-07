import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { NAV_ITEMS } from "@/config/navigation";
import { isAdminEmail } from "./admins";
import { canViewProject, canViewSection, normalizeEmail, permissionsFor } from "./policy";
import type { Permissions, Section } from "./roles";
import { getGrant } from "./store";

export interface Viewer {
  email: string;
  name: string | null;
  permissions: Permissions;
}

type ViewerState =
  | { status: "signed-out" }
  | { status: "no-access"; email: string | null }
  | { status: "ok"; viewer: Viewer };

/** Resolves the signed-in user and their access. Deduped per request. */
export const getViewerState = cache(async (): Promise<ViewerState> => {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) return { status: "signed-out" };

  const user = await currentUser();
  const primary = user?.primaryEmailAddress;
  if (!user || !primary || primary.verification?.status !== "verified") {
    return { status: "no-access", email: primary?.emailAddress ?? null };
  }

  const email = normalizeEmail(primary.emailAddress);
  const name = user.fullName || user.firstName || null;

  if (isAdminEmail(email)) {
    return { status: "ok", viewer: { email, name, permissions: permissionsFor("admin") } };
  }

  const grant = await getGrant(email);
  if (!grant) return { status: "no-access", email };

  return { status: "ok", viewer: { email, name, permissions: permissionsFor(grant.role, grant) } };
});

export async function requireViewer(): Promise<Viewer> {
  await auth.protect();
  const state = await getViewerState();
  if (state.status === "signed-out") redirect("/sign-in");
  if (state.status === "no-access") redirect("/no-access");
  return state.viewer;
}

export function firstAllowedHref(p: Permissions) {
  return NAV_ITEMS.find((item) => !item.section || canViewSection(p, item.section))?.href ?? "/settings";
}

export async function requireSection(section: Section): Promise<Viewer> {
  const viewer = await requireViewer();
  if (!canViewSection(viewer.permissions, section)) redirect(firstAllowedHref(viewer.permissions));
  return viewer;
}

export async function requireProject(projectId: string): Promise<Viewer> {
  const viewer = await requireSection("analysis");
  if (!canViewProject(viewer.permissions, projectId)) notFound();
  return viewer;
}

export async function requireAccessManager(): Promise<Viewer> {
  const viewer = await requireViewer();
  if (!viewer.permissions.canManageAccess) notFound();
  return viewer;
}
