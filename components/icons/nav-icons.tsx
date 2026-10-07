import type { ReactNode } from "react";
import type { AppRoute } from "@/config/navigation";

type IconProps = {
  className?: string;
};

function IconFrame({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function DashboardIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <rect x="3" y="3" width="7.5" height="9" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="5" rx="2" />
      <rect x="13.5" y="11" width="7.5" height="10" rx="2" />
      <rect x="3" y="15" width="7.5" height="6" rx="2" />
    </IconFrame>
  );
}

function AnalysisIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M3 3v18h18" />
      <path d="m7 15 4-4 3 3 6-7" />
    </IconFrame>
  );
}

function InputsIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M4 6h16M4 12h16M4 18h10" />
    </IconFrame>
  );
}

function SalesIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6.5V8M12 16v1.5" />
    </IconFrame>
  );
}

export const NAV_ICONS: Record<AppRoute, (props: IconProps) => ReactNode> = {
  "/": DashboardIcon,
  "/analysis": AnalysisIcon,
  "/inputs": InputsIcon,
  "/sales": SalesIcon,
};
