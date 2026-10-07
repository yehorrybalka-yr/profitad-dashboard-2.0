export const THEME_PREFERENCES = ["system", "light", "dark"] as const;
export type ThemePreference = (typeof THEME_PREFERENCES)[number];
export type ThemeId = Exclude<ThemePreference, "system">;

export const DEFAULT_THEME_PREFERENCE: ThemePreference = "system";
export const THEME_STORAGE_KEY = "profitad:v1:theme";
const CHANGE_EVENT = "profitad:theme-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";

export function isThemePreference(value: unknown): value is ThemePreference {
  return THEME_PREFERENCES.includes(value as ThemePreference);
}

/**
 * Runs before hydration: applies the saved preference without a flash and,
 * in "system" mode, keeps following the OS theme (also across tabs). Focus and
 * visibility re-checks cover browsers that skip `change` events for background tabs.
 */
export const THEME_BOOTSTRAP_SCRIPT = `(function(){var k="${THEME_STORAGE_KEY}",m=window.matchMedia("${DARK_QUERY}");function a(){var p;try{p=localStorage.getItem(k)}catch(e){}var t=p==="light"||p==="dark"?p:(m.matches?"dark":"light");document.documentElement.setAttribute("data-theme",t)}a();m.addEventListener("change",a);window.addEventListener("focus",a);document.addEventListener("visibilitychange",a);window.addEventListener("storage",function(e){if(e.key===k)a()});})();`;

export function readThemePreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : DEFAULT_THEME_PREFERENCE;
  } catch {
    return DEFAULT_THEME_PREFERENCE;
  }
}

export function resolveTheme(preference: ThemePreference): ThemeId {
  if (preference !== "system") return preference;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

export function setThemePreference(preference: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {}
  document.documentElement.dataset.theme = resolveTheme(preference);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeThemePreference(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
