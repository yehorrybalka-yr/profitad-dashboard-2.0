export type AppRoute = "/" | "/analysis" | "/inputs" | "/sales" | "/settings";

export interface NavItem {
  label: string;
  href: AppRoute;
  /** Pinned to the bottom of the sidebar. */
  footer?: boolean;
  /** Renders the project list under this item. */
  withProjects?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Дашборд", href: "/" },
  { label: "Анализ", href: "/analysis", withProjects: true },
  { label: "Вводные", href: "/inputs" },
  { label: "Sales", href: "/sales", footer: true },
  { label: "Настройки", href: "/settings", footer: true },
];

/** Order used for page slide direction. */
export const ROUTE_ORDER: AppRoute[] = NAV_ITEMS.map((item) => item.href);

export function isNavItemActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function routeIndex(pathname: string) {
  const index = ROUTE_ORDER.findIndex((href) => isNavItemActive(href, pathname));
  return index === -1 ? 0 : index;
}

export function getPageTitle(pathname: string, projects: { id: string; name: string }[]) {
  const projectMatch = pathname.match(/^\/analysis\/([^/]+)/);
  if (projectMatch) {
    return projects.find((p) => p.id === projectMatch[1])?.name ?? "Проект";
  }
  return NAV_ITEMS.find((item) => isNavItemActive(item.href, pathname))?.label ?? "";
}
