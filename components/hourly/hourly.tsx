import { HourlyMeteoData } from "@/services/openmeteo";
import styles from "./hourly.module.css";
import { wmoCodes } from "@/utils/utils";
import Image from "next/image";

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

function HourlyCard({ data }: HourlyCardProps) {
    const wData = wmoCodes[data.weatherCode];
    return (
        <div className={styles.card}>
            <p>{data.time.getHours()}:00</p>
            <Image
                src={wData.iconSmallPath}
                alt={wData.description}
                title={wData.description}
                width={32}
                height={32}
            />
            <p>{data.temperature.toFixed(0)}°C</p>
        </div>
    );
}
