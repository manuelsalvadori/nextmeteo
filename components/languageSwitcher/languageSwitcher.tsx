"use client";
import { useState } from "react";
import { Locale, locales, localesLabel } from "@/i18n/locales";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import styles from "./languageSwitcher.module.css";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

export default function LanguageSwitcher() {
    const [showLangs, setShowLangs] = useState(false);
    const pathname = usePathname();
    const currentLocale = useLocale() as Locale;

    return (
        <div className={styles.wrapper}>
            <button className={styles.button} onClick={() => setShowLangs((prev) => !prev)}>
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
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "-100%" }}
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
