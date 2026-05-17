import UnitsForm from "@/components/unitsForm/unitsForm";
import { defaultUnits, Units } from "@/utils/utils";
import { cookies } from "next/headers";
import styles from "./page.module.css";
import { getTranslations } from "next-intl/server";

export default async function Page() {
    const t = await getTranslations("Options");
    const cookieStore = await cookies();
    const unitsRaw = cookieStore.get("units")?.value;
    const units: Units = unitsRaw ? JSON.parse(decodeURIComponent(unitsRaw)) : defaultUnits;

    return (
        <div className={styles.body}>
            <h1>{t("options")}</h1>
            <UnitsForm key={JSON.stringify(units)} units={units} />
        </div>
    );
}
