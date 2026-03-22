import { wmoCodes } from "@/utils/utils";
import styles from "./daily.module.css";
import Image from "next/image";
import { WiHot, WiRaindrop, WiStrongWind, WiThermometer, WiWindDeg } from "react-icons/wi";
import { WiCloud } from "react-icons/wi";
import { DailyData } from "@/services/openmeteo";
import { getTranslations } from "next-intl/server";

export type DailyProps = {
    location: string;
    dailyData: DailyData;
};

const today = new Date();

export default async function Daily({ location, dailyData }: DailyProps) {
    const t = await getTranslations("WeatherDesc");
    const td = await getTranslations("Weekdays");

    const { currentMeteoData, dailyMeteoData } = dailyData;
    const wCode = currentMeteoData.weatherCode;
    const wData = wmoCodes[wCode];
    const description = t(wCode.toString());

    return (
        <div className={styles.day}>
            <div className={styles.mainSection}>
                <div>
                    <div className={styles.location}>
                        <p key={location}>{location}</p>
                    </div>

                    <p className={styles.rain}>
                        <WiCloud />
                        Copertura nuvolosa: {Math.round(currentMeteoData.cloudCover)}%
                    </p>
                    <p className={styles.rain}>
                        <WiRaindrop />
                        Umidità: {Math.round(currentMeteoData.relativeHumidity)}%
                    </p>
                    <div className={styles.temperature}>
                        <p key={currentMeteoData.temperature}>
                            {Math.round(currentMeteoData.temperature)}°C
                        </p>
                    </div>
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
            <div className={styles.infoSection}>
                <p>{td(today.getDay().toString())}</p>
                <p>{today.toLocaleDateString()}</p>
                <p>
                    <span>
                        <WiThermometer />
                        Max
                    </span>
                    <span>{Math.round(dailyMeteoData.temperatureMax)}°C</span>
                </p>
                <p>
                    <span>
                        <WiThermometer />
                        Min
                    </span>
                    <span>{Math.round(dailyMeteoData.temperatureMin)}°C</span>
                </p>
                <p>
                    <span>
                        <WiHot />
                        UV index
                    </span>
                    <span>{dailyMeteoData.uvIndexMax.toFixed(1)}</span>
                </p>
                <p>
                    <span>
                        <WiStrongWind />
                        Wind
                    </span>
                    <span>
                        <WiWindDeg
                            style={
                                {
                                    "--degrees": Math.round(dailyMeteoData.windDirection) + "deg",
                                } as React.CSSProperties
                            }
                            title={Math.round(dailyMeteoData.windDirection) + "°"}
                        />{" "}
                        {Math.round(dailyMeteoData.windSpeedMax)} km/h
                    </span>
                </p>
            </div>
        </div>
    );
}
