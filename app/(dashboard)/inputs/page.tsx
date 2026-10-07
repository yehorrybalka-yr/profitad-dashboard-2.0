import type { Metadata } from "next";
import { Placeholder } from "@/components/ui/page-header";
import { requireSection } from "@/lib/access/viewer";

export const metadata: Metadata = { title: "Вводные" };

export default async function InputsPage() {
  const { permissions } = await requireSection("inputs");

  return (
    <div className="flex flex-col gap-3">
      {!permissions.canEditInputs && (
        <p className="rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
          Режим просмотра: редактирование «Вводных» недоступно для вашего уровня доступа.
        </p>
      )}
      <Placeholder>Проекты, воронки и офферы — раздел в разработке.</Placeholder>
    </div>
  );
}
