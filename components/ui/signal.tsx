import { cn } from "@/lib/cn";
import type { PaceLevel } from "@/lib/domain/stats";
import { formatPercent } from "@/lib/format";

export const SIGNAL_TEXT: Record<PaceLevel, string> = {
  good: "text-positive",
  warning: "text-warning",
  bad: "text-negative",
  none: "text-muted-foreground",
};

export const SIGNAL_BG: Record<PaceLevel, string> = {
  good: "bg-positive",
  warning: "bg-warning",
  bad: "bg-negative",
  none: "bg-muted-foreground/40",
};

export const SIGNAL_SOFT: Record<PaceLevel, string> = {
  good: "bg-positive/12 text-positive",
  warning: "bg-warning/14 text-warning",
  bad: "bg-negative/12 text-negative",
  none: "bg-muted text-muted-foreground",
};

export function SignalDot({ level, className }: { level: PaceLevel; className?: string }) {
  return (
    <span
      className={cn(
        "size-2 shrink-0 rounded-full",
        level !== "none" && "signal-glow",
        SIGNAL_BG[level],
        SIGNAL_TEXT[level],
        className,
      )}
      aria-hidden
    />
  );
}

interface DeltaProps {
  /** Relative change, e.g. 0.12 = +12 %. */
  value: number;
  /** Whether growth is good (revenue) or bad (CPA). */
  goodWhen?: "up" | "down";
  suffix?: string;
  className?: string;
}

/** Pill with an arrow, colored bright green for progress and bright red for regress. */
export function Delta({ value, goodWhen = "up", suffix, className }: DeltaProps) {
  const up = value >= 0;
  const good = up === (goodWhen === "up");
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
        good ? SIGNAL_SOFT.good : SIGNAL_SOFT.bad,
        className,
      )}
    >
      <span aria-hidden>{up ? "▲" : "▼"}</span>
      {up ? "+" : ""}
      {formatPercent(value)}
      {suffix ? <span className="font-medium opacity-80">{suffix}</span> : null}
    </span>
  );
}
