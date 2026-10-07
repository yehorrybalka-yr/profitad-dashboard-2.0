import type { Metadata } from "next";
import { PageHeader, Placeholder } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Sales" };

export default function SalesPage() {
  return (
    <>
      <PageHeader title="Sales" />
      <Placeholder>Раздел в разработке</Placeholder>
    </>
  );
}
