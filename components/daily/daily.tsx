import { secondsToHours, wmoCodes } from "@/utils/utils";
import styles from "./daily.module.css";
import Image from "next/image";
import { WiHot, WiRaindrop, WiStrongWind, WiThermometer, WiWindDeg } from "react-icons/wi";
import { WiCloud } from "react-icons/wi";
import { DailyData } from "@/services/openmeteo";
import { getTranslations } from "next-intl/server";
import { GoSun } from "react-icons/go";
import FavButton from "../favButton/favButton";

export type DailyProps = {
    locationId: number;
    location: string;
    dailyData: DailyData;
    day: number;
};

export default async function Daily({ locationId, location, dailyData, day }: DailyProps) {
    const t = await getTranslations("WeatherDesc");
    const td = await getTranslations("Weekdays");
    const tm = await getTranslations("DayInfo");

    const displayDay = new Date();
    displayDay.setDate(displayDay.getDate() + day);

    const { currentMeteoData, dailyMeteoData } = dailyData;
    const { hours, minutes } = secondsToHours(dailyMeteoData.daylightDuration);

    const wCode = currentMeteoData.weatherCode;
    const wData = wmoCodes[wCode];
    const description = t(wCode.toString() as never);
    const daylightDuration = tm("duration", { hours: hours, minutes: minutes });

    return (
        <div className={styles.day}>
            <div className={styles.mainSection}>
                <div className={styles.location}>
                    <p key={location} title={location}>
                        {location}
                    </p>
                    <FavButton key={locationId} locationId={locationId} />
                </div>
                <div className={styles.mainSectionData}>
                    <div>
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
                        width={200}
                        height={200}
                    />
                </div>
            </div>
            <div className={styles.infoSection}>
                <p>{td(displayDay.getDay().toString() as never)}</p>
                <p>{displayDay.toLocaleDateString()}</p>
                <p>
                    <span>
                        <WiThermometer />
                        {tm("min")}
                    </span>
                    <span>{Math.round(dailyMeteoData.temperatureMin)}°C</span>
                </p>
                <p>
                    <span>
                        <WiThermometer />
                        {tm("max")}
                    </span>
                    <span>{Math.round(dailyMeteoData.temperatureMax)}°C</span>
                </p>
                <p>
                    <span>
                        <WiHot />
                        {tm("uv")}
                    </span>
                    <span>{dailyMeteoData.uvIndexMax.toFixed(1)}</span>
                </p>
                <p>
                    <span>
                        <GoSun />
                        {tm("daylight")}
                    </span>
                    <span>{daylightDuration}</span>
                </p>
                <p>
                    <span>
                        <WiStrongWind />
                        {tm("wind")}
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
