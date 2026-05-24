import { HourlyMeteoData } from "@/services/openmeteo";
import styles from "./hourly.module.css";
import { getTempSymbol, Units, wmoCodes } from "@/utils/utils";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import clsx from "clsx";

export type HourlyProps = {
    data: HourlyMeteoData[];
    units: Units;
    day: number;
};

export default async function Hourly({ data, units, day }: HourlyProps) {
    const tempUnit = getTempSymbol(units.temperature);

    return (
        <div className={styles.body}>
            {data.map((d, i) => {
                if (i % 2 !== 0) return null;
                return <HourlyCard data={d} key={i} tempUnit={tempUnit} day={day} />;
            })}
        </div>
    );
}

type HourlyCardProps = {
    data: HourlyMeteoData;
    tempUnit: string;
    day: number;
};

async function HourlyCard({ data, tempUnit, day }: HourlyCardProps) {
    const t = await getTranslations("WeatherDesc");

    const wCode = data.weatherCode;
    const wData = wmoCodes[wCode];
    const description = t(wCode.toString() as never);

    const nowhour = new Date().getHours();
    const now =
        nowhour === Number(data.time.split(":")[0]) ||
        nowhour === Number(data.time.split(":")[0]) + 1;

    return (
        <div className={clsx(styles.card, day === 0 && now && styles.cardnow)}>
            <p>{data.time}</p>
            <Image
                src={wData.iconSmallPath}
                alt={description}
                title={description}
                width={32}
                height={32}
            />
            <p>
                {data.temperature.toFixed(0)}
                {tempUnit}
            </p>
        </div>
    );
}
