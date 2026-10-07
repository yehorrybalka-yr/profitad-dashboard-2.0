import type { PaceLevel } from "@/lib/domain/stats";

export interface ProjectNavItem {
  id: string;
  name: string;
  /** Pace signal; only set for projects that are running. */
  signal: PaceLevel | null;
}
