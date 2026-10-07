import type { Metadata } from "next";
import { SalesBoard } from "@/components/sales/sales-board";
import { SalesSummaryTiles } from "@/components/sales/sales-summary";
import { requireSection } from "@/lib/access/viewer";
import { summarizeDeals } from "@/lib/sales/stages";
import { listDeals } from "@/lib/sales/store";

export const metadata: Metadata = { title: "Sales" };

export default async function SalesPage() {
  await requireSection("sales");
  const deals = await listDeals();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="flex min-h-0 flex-col gap-5">
      <SalesSummaryTiles summary={summarizeDeals(deals, today)} />
      <SalesBoard deals={deals} today={today} />
    </div>
  );
}
