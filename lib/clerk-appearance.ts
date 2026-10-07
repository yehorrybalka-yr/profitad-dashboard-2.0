/** Clerk UI themed with the app's CSS tokens, so it follows light/dark automatically. */
export const CLERK_APPEARANCE = {
  variables: {
    colorPrimary: "var(--accent)",
    colorPrimaryForeground: "var(--accent-foreground)",
    colorBackground: "var(--card)",
    colorForeground: "var(--foreground)",
    colorMuted: "var(--muted)",
    colorMutedForeground: "var(--muted-foreground)",
    colorInput: "var(--background)",
    colorInputForeground: "var(--foreground)",
    colorBorder: "var(--border)",
    colorRing: "var(--ring)",
    colorDanger: "var(--negative)",
    colorSuccess: "var(--positive)",
    colorWarning: "var(--warning)",
    colorNeutral: "var(--foreground)",
    borderRadius: "18px",
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  },
  elements: {
    cardBox: "rounded-[28px] border border-border shadow-[var(--shadow)]",
  },
};
