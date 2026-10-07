"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { routeIndex } from "@/config/navigation";
import { cn } from "@/lib/cn";

type Direction = "none" | "left" | "right";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [previous, setPrevious] = useState(pathname);
  const [direction, setDirection] = useState<Direction>("none");

  if (previous !== pathname) {
    setPrevious(pathname);
    setDirection(routeIndex(pathname) >= routeIndex(previous) ? "left" : "right");
  }

  return (
    <div
      key={pathname}
      className={cn(
        "lg:flex lg:flex-1 lg:flex-col",
        direction === "left" ? "page-enter-left" : direction === "right" ? "page-enter-right" : undefined,
      )}
    >
      {children}
    </div>
  );
}
