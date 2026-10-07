"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_CONFIG } from "@/config/app";
import { NAVIGATION } from "@/config/navigation";
import { cn } from "@/lib/cn";

interface SidebarProps {
  projects: { id: string; name: string }[];
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href;
}

export function Sidebar({ projects }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="px-6 py-6 text-lg font-bold tracking-tight">{APP_CONFIG.name}</div>
      <nav className="flex-1 overflow-y-auto px-3">
        {NAVIGATION.map((section, i) => (
          <ul key={i} className={cn("space-y-1 py-3", i > 0 && "border-t border-border")}>
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive(pathname, item.href)
                      ? "bg-accent-soft text-accent"
                      : "text-zinc-700 hover:bg-zinc-100",
                  )}
                >
                  {item.label}
                </Link>
                {item.withProjects && projects.length > 0 && (
                  <ul className="mt-1 space-y-0.5 pl-3">
                    {projects.map((p) => {
                      const href = `${item.href}/${p.id}`;
                      return (
                        <li key={p.id}>
                          <Link
                            href={href}
                            className={cn(
                              "block truncate rounded-md px-3 py-1.5 text-sm transition",
                              pathname === href
                                ? "bg-accent-soft text-accent"
                                : "text-muted hover:bg-zinc-100 hover:text-zinc-900",
                            )}
                          >
                            {p.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </aside>
  );
}
