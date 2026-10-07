"use server";

import { refresh } from "next/cache";
import { requireSection } from "@/lib/access/viewer";
import { isDealStage } from "@/lib/sales/stages";
import { createDeal, deleteDeal, moveDeal, updateDeal, type DealInput } from "@/lib/sales/store";

export interface DealActionState {
  ok: boolean;
  message: string | null;
}

const text = (formData: FormData, key: string, maxLength = 500) =>
  String(formData.get(key) ?? "").trim().slice(0, maxLength);

function parseDeal(formData: FormData): DealInput | string {
  const name = text(formData, "name", 120);
  if (!name) return "Укажите название проекта.";

  const stage = formData.get("stage");
  if (!isDealStage(stage)) return "Выберите этап.";

  const rawAmount = text(formData, "amount", 20).replace(/[\s,]/g, "");
  const amount = rawAmount ? Math.round(Number(rawAmount)) : null;
  if (amount !== null && (!Number.isFinite(amount) || amount < 0)) return "Бюджет должен быть числом.";

  const nextActionAt = text(formData, "nextActionAt", 10);
  if (nextActionAt && !/^\d{4}-\d{2}-\d{2}$/.test(nextActionAt)) return "Некорректная дата.";

  return {
    name,
    stage,
    amount,
    contactName: text(formData, "contactName", 120),
    contact: text(formData, "contact", 200),
    source: text(formData, "source", 120),
    notes: text(formData, "notes", 5000),
    nextAction: text(formData, "nextAction", 200),
    nextActionAt: nextActionAt || null,
  };
}

export async function saveDealAction(_prev: DealActionState, formData: FormData): Promise<DealActionState> {
  const viewer = await requireSection("sales");
  const input = parseDeal(formData);
  if (typeof input === "string") return { ok: false, message: input };

  const id = text(formData, "id", 64);
  if (id) {
    if (!(await updateDeal(id, input, viewer.email))) return { ok: false, message: "Сделка не найдена." };
  } else {
    await createDeal(input, viewer.email);
  }

  refresh();
  return { ok: true, message: id ? "Сделка сохранена." : "Сделка добавлена." };
}

export async function moveDealAction(id: string, stage: string, position: number) {
  const viewer = await requireSection("sales");
  if (!isDealStage(stage) || !Number.isFinite(position)) return;
  await moveDeal(id, stage, position, viewer.email);
  refresh();
}

export async function deleteDealAction(id: string): Promise<DealActionState> {
  await requireSection("sales");
  await deleteDeal(id);
  refresh();
  return { ok: true, message: "Сделка удалена." };
}
