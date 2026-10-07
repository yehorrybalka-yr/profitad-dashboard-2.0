"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ICONS } from "@/components/icons/nav-icons";
import { SignalDot } from "@/components/ui/signal";
import { APP_CONFIG } from "@/config/app";
import { NAV_ITEMS, isNavItemActive, type NavItem } from "@/config/navigation";
import { cn } from "@/lib/cn";
import type { ProjectNavItem } from "./types";

export function Sidebar({ projects }: { projects: ProjectNavItem[] }) {
  const main = NAV_ITEMS.filter((item) => !item.footer);
  const footer = NAV_ITEMS.filter((item) => item.footer);

  return (
    <aside className="glass hidden shrink-0 flex-col overflow-hidden rounded-[28px] text-sidebar-foreground backdrop-blur-xl lg:sticky lg:top-3 lg:flex lg:h-[calc(100dvh-1.5rem)] lg:w-[248px]">
      <Link href="/" className="px-6 pt-6 text-[22px] font-semibold tracking-[-0.04em]">
        {APP_CONFIG.name}
      </Link>

      <nav className="flex min-h-0 flex-1 flex-col gap-1 px-3 pt-5" aria-label="Навигация">
        <div className="flex min-h-0 flex-col gap-1 overflow-y-auto">
          {main.map((item) => (
            <div key={item.href} className="flex flex-col gap-0.5">
              <NavLink item={item} />
              {item.withProjects ? <ProjectLinks base={item.href} projects={projects} /> : null}
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-1 border-t border-border pt-3 pb-4">
          {footer.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>
      </nav>
    </aside>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const Icon = NAV_ICONS[item.href];
  const isActive =
    item.href === "/" ? pathname === "/" : pathname === item.href;

  return (
    <Link
      href={item.href}
      title={item.label}
      className={cn(
        "flex items-center gap-3 rounded-full px-3 py-2.5 text-[14px] font-medium tracking-[-0.01em] transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : isNavItemActive(item.href, pathname)
            ? "bg-sidebar-hover text-sidebar-foreground"
            : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground",
      )}
    >
      <Icon className="size-[18px] shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function ProjectLinks({ base, projects }: { base: string; projects: ProjectNavItem[] }) {
  const pathname = usePathname();
  if (projects.length === 0) return null;

  return (
    <ul className="flex flex-col gap-0.5 pl-6">
      {projects.map((p) => {
        const href = `${base}/${p.id}`;
        const active = pathname === href;
        return (
          <li key={p.id}>
            <Link
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-full px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] transition-colors",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground",
              )}
            >
              {p.signal ? <SignalDot level={p.signal} /> : <span className="size-2 shrink-0" />}
              <span className="truncate">{p.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
