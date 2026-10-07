import { asc, eq, max } from "drizzle-orm";
import { getDb } from "@/db";
import { deals, type DealRow } from "@/db/schema";
import type { Deal, DealStage } from "./stages";

export type DealInput = Pick<
  Deal,
  "name" | "contactName" | "contact" | "source" | "amount" | "stage" | "notes" | "nextActionAt" | "nextAction"
>;

function toDeal(row: DealRow): Deal {
  return {
    ...row,
    stageChangedAt: row.stageChangedAt.toISOString(),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function listDeals(): Promise<Deal[]> {
  const rows = await getDb().select().from(deals).orderBy(asc(deals.stage), asc(deals.position));
  return rows.map(toDeal);
}

async function nextPosition(stage: DealStage) {
  const [row] = await getDb()
    .select({ value: max(deals.position) })
    .from(deals)
    .where(eq(deals.stage, stage));
  return (row?.value ?? 0) + 1;
}

export async function createDeal(input: DealInput, actorEmail: string) {
  const id = crypto.randomUUID();
  await getDb()
    .insert(deals)
    .values({ ...input, id, position: await nextPosition(input.stage), updatedBy: actorEmail });
  return id;
}

export async function updateDeal(id: string, input: DealInput, actorEmail: string) {
  const [current] = await getDb().select().from(deals).where(eq(deals.id, id)).limit(1);
  if (!current) return false;

  const stageChanged = current.stage !== input.stage;
  await getDb()
    .update(deals)
    .set({
      ...input,
      ...(stageChanged && { position: await nextPosition(input.stage), stageChangedAt: new Date() }),
      updatedAt: new Date(),
      updatedBy: actorEmail,
    })
    .where(eq(deals.id, id));
  return true;
}

export async function moveDeal(id: string, stage: DealStage, position: number, actorEmail: string) {
  const [current] = await getDb().select({ stage: deals.stage }).from(deals).where(eq(deals.id, id)).limit(1);
  if (!current) return false;

  await getDb()
    .update(deals)
    .set({
      stage,
      position,
      ...(current.stage !== stage && { stageChangedAt: new Date() }),
      updatedAt: new Date(),
      updatedBy: actorEmail,
    })
    .where(eq(deals.id, id));
  return true;
}

export async function deleteDeal(id: string) {
  await getDb().delete(deals).where(eq(deals.id, id));
}
