export interface NavItem {
  label: string;
  href: string;
  /** Renders the project list under this item. */
  withProjects?: boolean;
}

export interface NavSection {
  items: NavItem[];
}

export const NAVIGATION: NavSection[] = [
  {
    items: [
      { label: "Дашборд", href: "/" },
      { label: "Анализ", href: "/analysis", withProjects: true },
      { label: "Вводные", href: "/inputs" },
    ],
  },
  {
    items: [{ label: "Sales", href: "/sales" }],
  },
];
