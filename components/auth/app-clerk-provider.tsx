"use client";

import { ruRU } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { useSyncExternalStore } from "react";
import { APP_CONFIG } from "@/config/app";
import { clerkAppearance } from "@/lib/clerk-appearance";
import type { ThemeId } from "@/lib/theme";

const LOCALIZATION = {
  ...ruRU,
  signIn: {
    ...ruRU.signIn,
    start: { ...ruRU.signIn?.start, title: `Вход в ${APP_CONFIG.name}`, subtitle: "Войдите рабочей почтой" },
  },
  signUp: {
    ...ruRU.signUp,
    start: { ...ruRU.signUp?.start, title: `Регистрация в ${APP_CONFIG.name}`, subtitle: "Используйте рабочую почту" },
  },
};

function subscribeAppliedTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const readAppliedTheme = (): ThemeId =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

export function AppClerkProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeAppliedTheme, readAppliedTheme, () => "light" as const);

  return (
    <ClerkProvider
      appearance={clerkAppearance(theme)}
      localization={LOCALIZATION}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      telemetry={false}
    >
      {children}
    </ClerkProvider>
  );
}
