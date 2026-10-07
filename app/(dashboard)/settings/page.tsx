import type { Metadata } from "next";
import { ThemePicker } from "@/components/settings/theme-picker";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Настройки" };

export default function SettingsPage() {
  return (
    <Card className="min-w-0">
      <h2 className="section-title">Оформление</h2>
      <p className="mt-1 text-sm text-muted-foreground">Выбор сохраняется на этом устройстве.</p>
      <div className="mt-5">
        <ThemePicker />
      </div>
    </Card>
  );
}
