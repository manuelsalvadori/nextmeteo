import { DailyMeteoData, WeeklyMeteoData } from "@/services/openmeteo";
import { getTranslations } from "next-intl/server";
import { Coordinates, wmoCodes } from "@/utils/utils";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import styles from "./weekly.module.css";

export type WeeklyProps = {
    weeklyData: WeeklyMeteoData;
    coords: Coordinates;
    location: string;
};

export default async function Weekly({ weeklyData, coords, location }: WeeklyProps) {
    return (
        <div className={styles.week}>
            {weeklyData.map((d, i) => (
                <WeeklyCard
                    key={i}
                    data={d}
                    href={`?location=${location}&lat=${coords.latitude}&lng=${coords.longitude}&day=${i}`}
                />
            ))}
        </div>
    );
}

type HourlyCardProps = {
    data: DailyMeteoData;
    href: string;
};

async function WeeklyCard({ data, href }: HourlyCardProps) {
    const t = await getTranslations("WeatherDesc");
    const td = await getTranslations("Weekdays");

    const wCode = data.weatherCode;
    const wData = wmoCodes[wCode];
    const description = t(wCode.toString() as never);
    return (
        <Link href={href} className={styles.weekCard}>
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
                <div>
                    <p>{data.temperatureMin.toFixed(0)}°C</p>
                    <p>{data.temperatureMax.toFixed(0)}°C</p>
                </div>
            </div>
        </Link>
    );
}
