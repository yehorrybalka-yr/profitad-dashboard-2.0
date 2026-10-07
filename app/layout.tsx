import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { APP_CONFIG } from "@/config/app";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: { default: APP_CONFIG.name, template: `%s · ${APP_CONFIG.name}` },
  description: "Результаты проектов, KPI и аналитика команды",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
