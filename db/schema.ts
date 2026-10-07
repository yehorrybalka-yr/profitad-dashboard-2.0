import { boolean, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import type { AssignableRole, Section } from "@/lib/access/roles";

/** Access is bound to the account email, so it can be granted before the first sign-in. */
export const accessGrants = pgTable("access_grants", {
  email: text("email").primaryKey(),
  role: text("role").$type<AssignableRole>().notNull(),
  /** Custom role only. */
  sections: jsonb("sections").$type<Section[]>().notNull().default([]),
  /** Custom role only; null means all projects. */
  projectIds: jsonb("project_ids").$type<string[] | null>(),
  /** Custom role only. */
  canEditInputs: boolean("can_edit_inputs").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  updatedBy: text("updated_by"),
});

export type AccessGrantRow = typeof accessGrants.$inferSelect;
