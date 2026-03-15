export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];

export const localesLabel: Record<Locale, string> = {
    it: "Italiano",
    en: "English",
};
