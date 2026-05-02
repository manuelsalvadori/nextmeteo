import { getCurrentMeteoArray, getLocationById, LocationData } from "@/services/openmeteo";
import { Link } from "@/i18n/navigation";
import { cookies } from "next/headers";
import { wmoCodes } from "@/utils/utils";
import { getLocale, getTranslations } from "next-intl/server";
import FavButton from "@/components/favButton/favButton";
import styles from "./page.module.css";
import Image from "next/image";
import CircleFlagClientWrapper from "@/components/CircleFlagClientWrapper";

export default async function Cities() {
    const t = await getTranslations("WeatherDesc");
    const tf = await getTranslations("Favorites");
    const locale = await getLocale();
    const cookieStore = await cookies();
    const rawValue = cookieStore.get("favs")?.value;
    const ids: number[] = rawValue ? JSON.parse(decodeURIComponent(rawValue)) : [];

    const citiesInfo = (await Promise.all(ids.map((id) => getLocationById(id, locale)))).filter(
        Boolean,
    ) as LocationData[];

    const coordsArray = citiesInfo.map((city) => city.coords);
    const meteoResults = await getCurrentMeteoArray(coordsArray);

    const citiesWithMeteo = citiesInfo.map((city, index) => ({
        ...city,
        currentMeteoData: meteoResults[index],
    }));

    return (
        <div className={styles.body}>
            <h1>{tf("title")}</h1>
            {citiesWithMeteo.length ? (
                <ul className={styles.list}>
                    {citiesWithMeteo.map((city) => {
                        const wCode = city.currentMeteoData.weatherCode;
                        const wData = wmoCodes[wCode];
                        const description = t(wCode.toString() as never);

                        return (
                            <li key={city.id} className={styles.result}>
                                <Link
                                    title={city.name}
                                    className={styles.card}
                                    href={`/?location=${city.name}&lat=${city.coords.latitude}&lon=${city.coords.longitude}`}
                                >
                                    <div className={styles.cardHeader}>
                                        <CircleFlagClientWrapper
                                            height={20}
                                            width={20}
                                            countryCode={city.countryCode}
                                        />
                                        <div>
                                            <p className={styles.location}>{city.name}</p>
                                            <p>
                                                {city.admin.charAt(0).toUpperCase() +
                                                    city.admin.slice(1)}
                                                , {city.country}
                                            </p>
                                        </div>
                                        <FavButton locationId={city.id} size='1.5rem' refresh />
                                    </div>

                                    <Image
                                        src={wData.iconLargePath}
                                        alt={description}
                                        title={description}
                                        width={150}
                                        height={150}
                                    />

                                    <p className={styles.temperature}>
                                        {Math.round(city.currentMeteoData.temperature)}°C
                                    </p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className={styles.noFavs}>{tf("noFavs")}</p>
            )}
        </div>
    );
}
