import {
  boolean,
  date,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type { AssignableRole, Section } from "@/lib/access/roles";
import type { DealStage } from "@/lib/sales/stages";

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

export const deals = pgTable(
  "deals",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    contactName: text("contact_name").notNull().default(""),
    contact: text("contact").notNull().default(""),
    source: text("source").notNull().default(""),
    amount: integer("amount"),
    stage: text("stage").$type<DealStage>().notNull(),
    position: doublePrecision("position").notNull().default(0),
    notes: text("notes").notNull().default(""),
    nextActionAt: date("next_action_at"),
    nextAction: text("next_action").notNull().default(""),
    stageChangedAt: timestamp("stage_changed_at", { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    updatedBy: text("updated_by"),
  },
  (t) => [index("deals_stage_position_idx").on(t.stage, t.position)],
);

export type DealRow = typeof deals.$inferSelect;
