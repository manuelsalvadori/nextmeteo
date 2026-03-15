import { wmoCodes } from "@/utils/utils";
import styles from "./daily.module.css";
import Image from "next/image";
import { WiRaindrop } from "react-icons/wi";
import { WiCloud } from "react-icons/wi";
import { CurrentMeteoData } from "@/services/openmeteo";
import { useTranslations } from "next-intl";

export type DailyProps = {
    location: string;
    currentMeteoData: CurrentMeteoData;
};

export default function Daily({ location, currentMeteoData }: DailyProps) {
    const t = useTranslations("WeatherDesc");

    const wCode = currentMeteoData.weatherCode;
    const wData = wmoCodes[wCode];
    const description = t(wCode.toString());

    return (
        <div className={styles.day}>
            <div>
                <div className={styles.location}>
                    <p key={location}>{location}</p>
                </div>

                <p className={styles.rain}>
                    <WiCloud />
                    Copertura nuvolosa: {currentMeteoData.cloudCover.toFixed(0)}%
                </p>
                <p className={styles.rain}>
                    <WiRaindrop />
                    Umidità: {currentMeteoData.relativeHumidity.toFixed(0)}%
                </p>
                <div className={styles.temperature}>
                    <p key={currentMeteoData.temperature}>
                        {currentMeteoData.temperature.toFixed(0)}°C
                    </p>
                </div>
            </div>
            <div>
                <p>{description}</p>
                <p>Massima 30C</p>
                <p>Minima 10C</p>
            </div>
            <Image
                src={wData.iconLargePath}
                alt={description}
                title={description}
                loading='eager'
                width={256}
                height={256}
            />
        </div>
    );
}
