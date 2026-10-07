import { Suspense } from "react";
import { APP_CONFIG } from "@/config/app";

export function AuthScreen({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-background p-6">
      <p className="text-[28px] font-semibold tracking-[-0.04em]">{APP_CONFIG.name}</p>
      <Suspense fallback={<div className="h-[420px] w-full max-w-[400px] animate-pulse rounded-[28px] bg-muted" />}>
        {children}
      </Suspense>
    </main>
  );
}
