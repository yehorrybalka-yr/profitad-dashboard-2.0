import { AppShell } from "@/components/layout/app-shell";
import { getProjectNav } from "@/lib/data";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const projects = await getProjectNav();
  return <AppShell projects={projects}>{children}</AppShell>;
}
