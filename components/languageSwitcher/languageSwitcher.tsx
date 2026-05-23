"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Locale, locales, localesLabel } from "@/i18n/locales";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import styles from "./languageSwitcher.module.css";
import Image from "next/image";

export default function LanguageSwitcher() {
    const [showLangs, setShowLangs] = useState(false);
    const pathname = usePathname();
    const currentLocale = useLocale() as Locale;

    const isTouchDevice = useMemo(() => {
        if (typeof window === "undefined") return false;

        return (
            ("ontouchstart" in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia("(pointer: coarse)").matches) &&
            !window.matchMedia("(pointer: fine)").matches
        );
    }, []);

    return (
        <div
            className={styles.wrapper}
            onMouseEnter={() => !isTouchDevice && setShowLangs(true)}
            onMouseLeave={() => !isTouchDevice && setShowLangs(false)}
        >
            <button
                className={styles.button}
                onClick={() => isTouchDevice && setShowLangs((prev) => !prev)}
            >
                <Image
                    src={`https://hatscripts.github.io/circle-flags/flags/language/${currentLocale}.svg`}
                    alt={currentLocale}
                    width={28}
                    height={28}
                />
                <p>{localesLabel[currentLocale]}</p>
            </button>
            <AnimatePresence>
                {showLangs && (
                    <motion.div
                        className={styles.langOptions}
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                            opacity: {
                                duration: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                            },
                        }}
                    >
                        {locales.map((lang) => (
                            <Link
                                key={lang}
                                href={pathname}
                                locale={lang}
                                className={styles.langOption}
                            >
                                <Image
                                    src={`https://hatscripts.github.io/circle-flags/flags/language/${lang}.svg`}
                                    alt={currentLocale}
                                    width={28}
                                    height={28}
                                    loading='lazy'
                                />
                                {localesLabel[lang]}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
