import { cn } from "@/lib/cn";
import { PLATFORM_LABELS } from "@/lib/domain/metrics";
import type { TrafficSource } from "@/lib/domain/types";

export function SourceChips({ sources, className }: { sources: TrafficSource[]; className?: string }) {
  if (sources.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {sources.map((source, i) => (
        <span
          key={`${source.platform}:${source.accountId}:${i}`}
          title={source.accountId ? `ID кабинета: ${source.accountId}` : "Доступа к кабинету пока нет"}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
            source.accountId ? "bg-muted text-foreground" : "bg-muted/60 text-muted-foreground",
          )}
        >
          <span
            className={cn("size-1.5 rounded-full", source.accountId ? "bg-positive" : "bg-muted-foreground/50")}
            aria-hidden
          />
          {PLATFORM_LABELS[source.platform]}
          {!source.accountId && <span className="opacity-70">· нет доступа</span>}
        </span>
      ))}
    </div>
  );
}
