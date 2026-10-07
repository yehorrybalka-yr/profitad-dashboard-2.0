import type { Metadata } from "next";
import { PageHeader, Placeholder } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Вводные" };

export default function InputsPage() {
  return (
    <>
      <PageHeader title="Вводные" />
      <Placeholder>Проекты, воронки и офферы — раздел в разработке</Placeholder>
    </>
  );
}
