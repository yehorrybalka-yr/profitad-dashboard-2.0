export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-[var(--radius)] bg-card p-8 shadow-[var(--shadow)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Soon</p>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{children}</p>
    </section>
  );
}
