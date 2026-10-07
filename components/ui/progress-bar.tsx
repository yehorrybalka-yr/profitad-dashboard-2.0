import { cn } from "@/lib/cn";
import { paceLevel, type PaceLevel } from "@/lib/domain/stats";

const LEVEL_CLASSES: Record<PaceLevel, string> = {
  good: "bg-emerald-500",
  warning: "bg-amber-500",
  bad: "bg-rose-500",
};

interface ProgressBarProps {
  /** 0..n, clamped to 1 visually */
  value: number;
  /** Share of the period elapsed, rendered as a marker. */
  marker?: number;
  /** Colors the bar by pace; defaults to the value itself. */
  pace?: number;
}

export function ProgressBar({ value, marker, pace = value }: ProgressBarProps) {
  const width = `${Math.min(value, 1) * 100}%`;
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-100">
      <div className={cn("h-full rounded-full", LEVEL_CLASSES[paceLevel(pace)])} style={{ width }} />
      {marker !== undefined && (
        <div
          className="absolute top-0 h-full w-0.5 bg-zinc-900/40"
          style={{ left: `${Math.min(marker, 1) * 100}%` }}
          aria-hidden
        />
      )}
    </div>
  );
}
