"use client";

import { useDeferredValue, useOptimistic, useState, useTransition } from "react";
import { moveDealAction } from "@/app/(dashboard)/sales/actions";
import { TONE_DOT } from "@/components/ui/status-badge";
import { cn } from "@/lib/cn";
import { formatWholeCurrency, formatDate } from "@/lib/format";
import { DEAL_STAGES, isOpenStage, STAGE_META, type Deal, type DealStage } from "@/lib/sales/stages";
import { DealDrawer } from "./deal-drawer";

type Move = { id: string; stage: DealStage; position: number };
type DropTarget = { stage: DealStage; beforeId: string | null };

const DAY_MS = 86_400_000;

function positionFor(column: Deal[], beforeId: string | null) {
  if (column.length === 0) return 1;
  const index = beforeId ? column.findIndex((d) => d.id === beforeId) : -1;
  if (index === -1) return column[column.length - 1].position + 1;
  if (index === 0) return column[0].position - 1;
  return (column[index - 1].position + column[index].position) / 2;
}

export function SalesBoard({ deals, today }: { deals: Deal[]; today: string }) {
  const [optimisticDeals, applyMove] = useOptimistic(deals, (state, move: Move) =>
    state.map((d) => (d.id === move.id ? { ...d, stage: move.stage, position: move.position } : d)),
  );
  const [, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const [dragId, setDragId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);
  const [drawer, setDrawer] = useState<{ deal: Deal | null; stage: DealStage } | null>(null);

  const visible = deferredQuery
    ? optimisticDeals.filter((d) =>
        [d.name, d.contactName, d.contact, d.source].some((v) => v.toLowerCase().includes(deferredQuery)),
      )
    : optimisticDeals;

  const columns = DEAL_STAGES.map((stage) => ({
    stage,
    deals: visible.filter((d) => d.stage === stage).sort((a, b) => a.position - b.position),
  }));

  const drop = (target: DropTarget) => {
    const id = dragId;
    setDragId(null);
    setDropTarget(null);
    if (!id || id === target.beforeId) return;

    const column = optimisticDeals
      .filter((d) => d.stage === target.stage && d.id !== id)
      .sort((a, b) => a.position - b.position);
    const move = { id, stage: target.stage, position: positionFor(column, target.beforeId) };

    startTransition(async () => {
      applyMove(move);
      await moveDealAction(move.id, move.stage, move.position);
    });
  };

  return (
    <section className="flex min-h-0 flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по проекту, контакту, источнику"
          className="field max-w-sm"
        />
        <button
          type="button"
          className="btn-primary ml-auto"
          onClick={() => setDrawer({ deal: null, stage: "contacted" })}
        >
          Новая сделка
        </button>
      </div>

      <div className="-mx-3 flex snap-x gap-3 overflow-x-auto px-3 pb-3 sm:-mx-4 sm:px-4 lg:mx-0 lg:px-0">
        {columns.map(({ stage, deals: columnDeals }) => {
          const meta = STAGE_META[stage];
          const total = columnDeals.reduce((acc, d) => acc + (d.amount ?? 0), 0);
          const isTarget = dropTarget?.stage === stage;

          return (
            <div
              key={stage}
              onDragOver={(e) => {
                if (!dragId) return;
                e.preventDefault();
                if (!isTarget || dropTarget.beforeId !== null) setDropTarget({ stage, beforeId: null });
              }}
              onDrop={(e) => {
                e.preventDefault();
                drop(dropTarget?.stage === stage ? dropTarget : { stage, beforeId: null });
              }}
              className={cn(
                "flex w-[272px] shrink-0 snap-start flex-col rounded-[24px] border border-border bg-muted/50 p-2 transition-colors",
                isTarget && "border-ring/40 bg-muted",
              )}
            >
              <header className="flex items-center gap-2 px-2 pt-1.5 pb-2.5">
                <span className={cn("size-2 shrink-0 rounded-full", TONE_DOT[meta.tone])} aria-hidden />
                <h3 className="min-w-0 truncate text-sm font-semibold tracking-[-0.02em]">{meta.label}</h3>
                <span className="ml-auto rounded-full bg-card px-2 py-0.5 text-xs font-semibold tabular-nums">
                  {columnDeals.length}
                </span>
              </header>
              {total > 0 && (
                <p className="-mt-1.5 px-2 pb-2 text-xs text-muted-foreground tabular-nums">
                  {formatWholeCurrency(total)} / мес
                </p>
              )}

              <ul className="flex min-h-16 flex-col gap-2">
                {columnDeals.map((deal) => (
                  <li
                    key={deal.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = "move";
                      e.dataTransfer.setData("text/plain", deal.id);
                      setDragId(deal.id);
                    }}
                    onDragEnd={() => {
                      setDragId(null);
                      setDropTarget(null);
                    }}
                    onDragOver={(e) => {
                      if (!dragId) return;
                      e.preventDefault();
                      e.stopPropagation();
                      if (dropTarget?.beforeId !== deal.id) setDropTarget({ stage, beforeId: deal.id });
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      drop({ stage, beforeId: deal.id });
                    }}
                    className={cn(
                      "relative",
                      dropTarget?.beforeId === deal.id &&
                        "before:absolute before:inset-x-2 before:-top-1.5 before:h-0.5 before:rounded-full before:bg-ring",
                    )}
                  >
                    <DealCard
                      deal={deal}
                      today={today}
                      dragging={dragId === deal.id}
                      onOpen={() => setDrawer({ deal, stage: deal.stage })}
                    />
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="btn-ghost mt-2 w-full justify-start px-3 py-2 text-xs"
                onClick={() => setDrawer({ deal: null, stage })}
              >
                + Добавить
              </button>
            </div>
          );
        })}
      </div>

      {drawer && (
        <DealDrawer
          key={drawer.deal?.id ?? `new:${drawer.stage}`}
          deal={drawer.deal}
          defaultStage={drawer.stage}
          onClose={() => setDrawer(null)}
        />
      )}
    </section>
  );
}

function DealCard({
  deal,
  today,
  dragging,
  onOpen,
}: {
  deal: Deal;
  today: string;
  dragging: boolean;
  onOpen: () => void;
}) {
  const overdue = Boolean(deal.nextActionAt && deal.nextActionAt < today && isOpenStage(deal.stage));
  const daysInStage = Math.max(
    0,
    Math.round((Date.parse(today) - Date.parse(deal.stageChangedAt.slice(0, 10))) / DAY_MS),
  );

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "flex w-full cursor-grab flex-col gap-2 rounded-[18px] border border-border bg-card p-3 text-left shadow-[var(--shadow)] transition-[transform,opacity] hover:-translate-y-0.5 active:cursor-grabbing",
        dragging && "opacity-40",
      )}
    >
      <div className="flex items-start gap-2">
        <p className="min-w-0 flex-1 text-sm font-semibold leading-5 tracking-[-0.02em] [overflow-wrap:anywhere]">
          {deal.name}
        </p>
        {deal.amount !== null && (
          <span className="shrink-0 text-xs font-semibold tabular-nums">{formatWholeCurrency(deal.amount)}</span>
        )}
      </div>

      {(deal.contactName || deal.source) && (
        <p className="truncate text-xs text-muted-foreground">
          {[deal.contactName, deal.source].filter(Boolean).join(" · ")}
        </p>
      )}

      <div className="flex items-center gap-2 text-xs">
        {deal.nextActionAt || deal.nextAction ? (
          <span
            className={cn(
              "min-w-0 truncate rounded-full px-2 py-0.5",
              overdue ? "bg-negative/12 font-semibold text-negative" : "bg-muted text-muted-foreground",
            )}
          >
            {[deal.nextActionAt && formatDate(deal.nextActionAt), deal.nextAction].filter(Boolean).join(" · ")}
          </span>
        ) : null}
        <span className="ml-auto shrink-0 text-muted-foreground tabular-nums" title="Дней на этапе">
          {daysInStage} дн.
        </span>
      </div>
    </button>
  );
}
