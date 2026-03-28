import { HourlyMeteoData } from "@/services/openmeteo";
import styles from "./hourly.module.css";
import { wmoCodes } from "@/utils/utils";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export type HourlyProps = {
    data: HourlyMeteoData[];
};

export default function Hourly({ data }: HourlyProps) {
    return (
        <div className={styles.body}>
            {data.map((d, i) => {
                return <HourlyCard data={d} key={i} />;
            })}
        </div>
    );
}

type HourlyCardProps = {
    data: HourlyMeteoData;
};

async function HourlyCard({ data }: HourlyCardProps) {
    const t = await getTranslations("WeatherDesc");

    const wCode = data.weatherCode;
    const wData = wmoCodes[wCode];
    const description = t(wCode.toString() as never);
    return (
        <div className={styles.card}>
            <p>{data.time.getHours()}:00</p>
            <Image
                src={wData.iconSmallPath}
                alt={description}
                title={description}
                width={32}
                height={32}
            />
            <p>{data.temperature.toFixed(0)}°C</p>
        </div>
    );
}
