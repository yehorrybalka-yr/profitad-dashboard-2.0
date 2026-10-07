import { Sidebar } from "@/components/layout/sidebar";
import { getProjectNav } from "@/lib/data";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const projects = await getProjectNav();

  return (
    <div className="flex min-h-screen">
      <Sidebar projects={projects} />
      <main className="min-w-0 flex-1 px-10 py-8">{children}</main>
    </div>
  );
}
