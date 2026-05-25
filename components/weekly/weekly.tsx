import { DailyMeteoData, getWeeklyMeteo } from "@/services/openmeteo";
import { getTranslations } from "next-intl/server";
import { Coordinates, getTempSymbol, Units, wmoCodes } from "@/utils/utils";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import styles from "./weekly.module.css";
import ScrollResetter from "../scrollResetter/scrollResetter";

export type WeeklyProps = {
    coords: Coordinates;
    location: string;
    units: Units;
};

export default async function Weekly({ coords, location, units }: WeeklyProps) {
    const weeklyData = await getWeeklyMeteo(coords, units);
    return (
        <div className={styles.week}>
            <ScrollResetter />
            {weeklyData.map((d, i) => (
                <WeeklyCard
                    key={i}
                    data={d}
                    href={`?location=${location}&lat=${coords.latitude}&lng=${coords.longitude}&day=${i}`}
                    tempUnit={getTempSymbol(units.temperature)}
                />
            ))}
        </div>
    );
}

type HourlyCardProps = {
    data: DailyMeteoData;
    href: string;
    tempUnit: string;
};

async function WeeklyCard({ data, href, tempUnit }: HourlyCardProps) {
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
                <div>
                    <p>
                        {data.temperatureMax.toFixed(0)}
                        {tempUnit}
                    </p>
                    <p>
                        {data.temperatureMin.toFixed(0)}
                        {tempUnit}
                    </p>
                </div>
            </div>
        </Link>
    );
}
