export const locales = ["it", "en", "de", "es", "fr"] as const;
export type Locale = (typeof locales)[number];

export const localesLabel: Record<Locale, string> = {
    it: "Italiano",
    en: "English",
    de: "Deutsch",
    fr: "Français",
    es: "Español ",
};
