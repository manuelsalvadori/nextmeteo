"use client";

import { setUnitsAction } from "@/app/actions/setUnitsAction";
import { useRouter } from "@/i18n/navigation";
import { Units } from "@/utils/utils";
import styles from "./unitsForm.module.css";
import { useTranslations } from "next-intl";

export default function UnitsForm({ units }: { units: Units }) {
    const router = useRouter();
    const t = useTranslations("Options");

    const handleSubmit = async (formData: FormData) => {
        const payload: Units = {
            precipitation: formData.get("precipitation") as Units["precipitation"],
            temperature: formData.get("temperature") as Units["temperature"],
            wind_speed: formData.get("wind_speed") as Units["wind_speed"],
        };

        await setUnitsAction(payload);
        router.refresh();
    };

    return (
        <form action={handleSubmit} className={styles.body}>
            <div>
                <label htmlFor='precipitation'>{t("prepUnit")}</label>
                <select name='precipitation' defaultValue={units.precipitation}>
                    <option value='mm'>mm</option>
                    <option value='inch'>inch</option>
                </select>
            </div>

            <div>
                <label htmlFor='temperature'>{t("tempUnit")}</label>
                <select name='temperature' defaultValue={units.temperature}>
                    <option value='celsius'>celsius</option>
                    <option value='fahrenheit'>fahrenheit</option>
                </select>
            </div>

            <div>
                <label htmlFor='wind_speed'>{t("windUnit")}</label>
                <select name='wind_speed' defaultValue={units.wind_speed}>
                    <option value='kmh'>km/h</option>
                    <option value='mph'>mph</option>
                </select>
            </div>

            <button type='submit' className={styles.submitButton}>
                {t("save")}
            </button>
        </form>
    );
}
