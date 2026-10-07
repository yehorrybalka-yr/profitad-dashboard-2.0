"use server";

import { refresh } from "next/cache";
import { isAdminEmail } from "@/lib/access/admins";
import { canManageRole, isValidEmail, manageableRoles, normalizeEmail } from "@/lib/access/policy";
import { isAssignableRole, isSection, type AccessGrant } from "@/lib/access/roles";
import { deleteGrant, getGrant, saveGrant } from "@/lib/access/store";
import { requireAccessManager, type Viewer } from "@/lib/access/viewer";
import { getProjects } from "@/lib/data";

export interface AccessActionState {
  ok: boolean;
  message: string | null;
}

async function checkTarget(actor: Viewer, email: string): Promise<string | null> {
  if (!isValidEmail(email)) return "Введите корректную почту.";
  if (isAdminEmail(email)) return "Доступ администратора нельзя изменить или отозвать.";
  if (email === actor.email) return "Свой уровень доступа изменить нельзя.";

  const existing = await getGrant(email);
  if (existing && !canManageRole(actor.permissions.role, existing.role)) {
    return "У вас нет прав управлять доступом этого пользователя.";
  }
  return null;
}

export async function saveGrantAction(
  _prev: AccessActionState,
  formData: FormData,
): Promise<AccessActionState> {
  const actor = await requireAccessManager();
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const role = formData.get("role");

  const targetError = await checkTarget(actor, email);
  if (targetError) return { ok: false, message: targetError };

  if (!isAssignableRole(role) || !manageableRoles(actor.permissions.role).includes(role)) {
    return { ok: false, message: "Этот уровень доступа вам недоступен." };
  }

  const grant: Omit<AccessGrant, "updatedAt" | "updatedBy"> = {
    email,
    role,
    sections: [],
    projectIds: null,
    canEditInputs: false,
  };

  if (role === "custom") {
    grant.sections = formData.getAll("sections").filter(isSection);
    if (grant.sections.length === 0) return { ok: false, message: "Выберите хотя бы одну вкладку." };

    if (formData.get("projectsMode") === "selected") {
      const knownIds = new Set((await getProjects()).map((p) => p.id));
      grant.projectIds = formData
        .getAll("projectIds")
        .map(String)
        .filter((id) => knownIds.has(id));
      if (grant.projectIds.length === 0) return { ok: false, message: "Выберите хотя бы один проект." };
    }

    grant.canEditInputs = formData.get("canEditInputs") === "on" && grant.sections.includes("inputs");
  }

  await saveGrant(grant, actor.email);
  refresh();
  return { ok: true, message: `Доступ для ${email} сохранён.` };
}

export async function revokeGrantAction(email: string): Promise<AccessActionState> {
  const actor = await requireAccessManager();
  const target = normalizeEmail(email);

  const targetError = await checkTarget(actor, target);
  if (targetError) return { ok: false, message: targetError };

  await deleteGrant(target);
  refresh();
  return { ok: true, message: `Доступ для ${target} отозван.` };
}
