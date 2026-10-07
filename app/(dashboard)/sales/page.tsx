import type { Metadata } from "next";
import { Placeholder } from "@/components/ui/page-header";
import { requireSection } from "@/lib/access/viewer";

export const metadata: Metadata = { title: "Sales" };

export default async function SalesPage() {
  await requireSection("sales");
  return <Placeholder>Раздел в разработке.</Placeholder>;
}
