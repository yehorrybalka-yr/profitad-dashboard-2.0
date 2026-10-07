import { cn } from "@/lib/cn";
import { STATUS_META, type StatusTone } from "@/lib/domain/statuses";
import type { ProjectStatus } from "@/lib/domain/types";

export const TONE_CLASSES: Record<StatusTone, string> = {
  green: "bg-positive/12 text-positive",
  amber: "bg-warning/14 text-warning",
  blue: "bg-info/14 text-info",
  red: "bg-negative/12 text-negative",
  gray: "bg-muted text-muted-foreground",
};

export const TONE_DOT: Record<StatusTone, string> = {
  green: "bg-positive",
  amber: "bg-warning",
  blue: "bg-info",
  red: "bg-negative",
  gray: "bg-muted-foreground",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-[-0.01em]",
        TONE_CLASSES[meta.tone],
      )}
    >
      <span className={cn("size-1.5 rounded-full", TONE_DOT[meta.tone])} aria-hidden />
      {meta.label}
    </span>
  );
}
