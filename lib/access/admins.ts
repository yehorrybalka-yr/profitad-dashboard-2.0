import { normalizeEmail } from "./policy";

/** Admins are configured outside the app (ADMIN_EMAILS, comma-separated), so nobody can revoke them from the UI. */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map(normalizeEmail)
    .filter(Boolean);
}

export const isAdminEmail = (email: string) => getAdminEmails().includes(normalizeEmail(email));
