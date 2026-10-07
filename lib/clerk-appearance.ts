import type { ThemeId } from "./theme";

/**
 * Clerk derives shades from these colors and redefines generic CSS variables (e.g. --accent)
 * inside its components, so it gets literal values that mirror the tokens in globals.css.
 */
const PALETTES: Record<ThemeId, Record<string, string>> = {
  light: {
    colorPrimary: "#111111",
    colorPrimaryForeground: "#f7f7f7",
    colorBackground: "#ffffff",
    colorForeground: "#111111",
    colorMuted: "#ececee",
    colorMutedForeground: "#6e6e73",
    colorInput: "#f5f5f7",
    colorInputForeground: "#111111",
    colorBorder: "#e4e4e7",
    colorRing: "#111111",
    colorNeutral: "#111111",
    colorDanger: "#ff2d2d",
    colorSuccess: "#00c853",
    colorWarning: "#ff9f0a",
  },
  dark: {
    colorPrimary: "#ececec",
    colorPrimaryForeground: "#111111",
    colorBackground: "#141414",
    colorForeground: "#f5f5f5",
    colorMuted: "#161616",
    colorMutedForeground: "#8a8a8a",
    colorInput: "#0b0b0b",
    colorInputForeground: "#f5f5f5",
    colorBorder: "#262626",
    colorRing: "#ececec",
    colorNeutral: "#f5f5f5",
    colorDanger: "#ff453a",
    colorSuccess: "#22e36b",
    colorWarning: "#ffb340",
  },
};

export function clerkAppearance(theme: ThemeId) {
  return {
    variables: {
      ...PALETTES[theme],
      borderRadius: "18px",
      fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
    },
    elements: {
      cardBox: "rounded-[28px]! shadow-[var(--shadow)]!",
    },
  };
}
