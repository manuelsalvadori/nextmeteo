import { HourlyMeteoData } from "@/services/openmeteo";
import styles from "./hourly.module.css";
import { getTempSymbol, Units, wmoCodes } from "@/utils/utils";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export type HourlyProps = {
    data: HourlyMeteoData[];
    units: Units;
};

export default async function Hourly({ data, units }: HourlyProps) {
    const tempUnit = getTempSymbol(units.temperature);

    return (
        <div className={styles.body}>
            {data.map((d, i) => {
                if (i % 2 !== 0) return null;
                return <HourlyCard data={d} key={i} tempUnit={tempUnit} />;
            })}
        </div>
    );
}

type HourlyCardProps = {
    data: HourlyMeteoData;
    tempUnit: string;
};

async function HourlyCard({ data, tempUnit }: HourlyCardProps) {
    const t = await getTranslations("WeatherDesc");

    const wCode = data.weatherCode;
    const wData = wmoCodes[wCode];
    const description = t(wCode.toString() as never);

    return (
        <div className={styles.card}>
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
