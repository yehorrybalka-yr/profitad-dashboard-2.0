import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { APP_CONFIG } from "@/config/app";
import { CLERK_APPEARANCE } from "@/lib/clerk-appearance";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: APP_CONFIG.name, template: `%s · ${APP_CONFIG.name}` },
  description: "Результаты проектов, KPI и аналитика команды",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} min-h-dvh antialiased`}
      data-theme="light"
      suppressHydrationWarning
    >
      <body className="min-h-dvh font-sans">
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
        <ClerkProvider
          appearance={CLERK_APPEARANCE}
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          signInFallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
          telemetry={false}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
