export function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-center gap-4">
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      {children}
    </header>
  );
}

export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted">
      {children}
    </div>
  );
}
