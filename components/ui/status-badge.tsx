import { cn } from "@/lib/cn";
import { STATUS_META, type StatusTone } from "@/lib/domain/statuses";
import type { ProjectStatus } from "@/lib/domain/types";

const TONE_CLASSES: Record<StatusTone, string> = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  blue: "bg-sky-50 text-sky-700 ring-sky-200",
  red: "bg-rose-50 text-rose-700 ring-rose-200",
  gray: "bg-zinc-100 text-zinc-600 ring-zinc-200",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        TONE_CLASSES[meta.tone],
      )}
    >
      {meta.label}
    </span>
  );
}
