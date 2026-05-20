import { getTranslations } from "next-intl/server";
import styles from "./privacyPolicy.module.css";

export default async function Page() {
    const t = await getTranslations("Privacy");

    return (
        <div className={styles.body}>
            <h1>{t("title")}</h1>
            <p>
                <strong>{t("lastUpdated")}</strong>
            </p>

            <p>{t.rich("intro", { strong: (chunks) => <strong>{chunks}</strong> })}</p>

            {/* Section 1 */}
            <h2>{t("section1.title")}</h2>
            <p>{t.rich("section1.p1", { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            <ul>
                <li>{t("section1.li1")}</li>
                <li>{t("section1.li2")}</li>
                <li>{t("section1.li3")}</li>
            </ul>

            {/* Section 2 */}
            <h2>{t("section2.title")}</h2>
            <p>{t("section2.p1")}</p>
            <ul>
                <li>{t.rich("section2.li1", { strong: (chunks) => <strong>{chunks}</strong> })}</li>
                <li>
                    {t.rich("section2.li2", {
                        link: (chunks) => (
                            <a
                                href='https://open-meteo.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {chunks}
                            </a>
                        ),
                    })}
                </li>
                <li>{t.rich("section2.li3", { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            </ul>

            {/* Section 3 */}
            <h2>{t("section3.title")}</h2>
            <p>{t("section3.p1")}</p>
            <ul>
                <li>{t.rich("section3.li1", { strong: (chunks) => <strong>{chunks}</strong> })}</li>
                <li>{t("section3.li2")}</li>
            </ul>

            {/* Section 4 */}
            <h2>{t("section4.title")}</h2>
            <p>
                {t.rich("section4.p1", {
                    strong: (chunks) => <strong>{chunks}</strong>,
                    link: (chunks) => (
                        <a
                            href='https://open-meteo.com/en/privacy'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {chunks}
                        </a>
                    ),
                })}
            </p>

            {/* Section 5 */}
            <h2>{t("section5.title")}</h2>
            <p>{t("section5.p1")}</p>
        </div>
    );
}
