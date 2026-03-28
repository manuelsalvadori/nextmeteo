import { DailyMeteoData, WeeklyMeteoData } from "@/services/openmeteo";
import { getTranslations } from "next-intl/server";
import { wmoCodes } from "@/utils/utils";
import styles from "./weekly.module.css";
import Image from "next/image";
import { WiThermometer } from "react-icons/wi";

export type WeeklyProps = {
    weeklyData: WeeklyMeteoData;
};

export default async function Weekly({ weeklyData }: WeeklyProps) {
    //const t = await getTranslations("DayInfo");

    return (
        <div className={styles.week}>
            {weeklyData.map((d, i) => (
                <WeeklyCard key={i} data={d} />
            ))}
        </div>
    );
}

type HourlyCardProps = {
    data: DailyMeteoData;
};

async function WeeklyCard({ data }: HourlyCardProps) {
    const t = await getTranslations("WeatherDesc");
    const td = await getTranslations("Weekdays");

    const wCode = data.weatherCode;
    const wData = wmoCodes[wCode];
    const description = t(wCode.toString() as never);
    return (
        <div className={styles.weekCard}>
            <p className={styles.weekDay}>
                {td(data.time.getDay().toString() as never)} {data.time.getDate()}
            </p>
            <div className={styles.info}>
                <Image
                    src={wData.iconSmallPath}
                    alt={description}
                    title={description}
                    width={16 * 3}
                    height={16 * 3}
                    preload
                />
                <p>{description}</p>
                <p>
                    <WiThermometer />
                    {data.temperatureMin.toFixed(0)}° {data.temperatureMax.toFixed(0)}°C
                </p>
            </div>
        </div>
    );
}
