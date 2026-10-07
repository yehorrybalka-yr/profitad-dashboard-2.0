import { cn } from "@/lib/cn";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-xl border border-border bg-surface p-5 shadow-sm", className)}
      {...props}
    />
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">{children}</h2>
  );
}
