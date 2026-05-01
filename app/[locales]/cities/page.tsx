"use client";
import { useAtomValue } from "jotai";
import { favsAtom } from "@/atoms/favsAtom";
import { useQuery } from "@tanstack/react-query";
import { getLocationById } from "@/services/openmeteo";
import { useLocale } from "next-intl";
import { CircleFlag } from "react-circle-flags";
import { Link } from "@/i18n/navigation";
import FavButton from "@/components/favButton/favButton";
import styles from "./page.module.css";

export default function Cities() {
    const favs = useAtomValue(favsAtom);
    const locale = useLocale();

    const { data: cities, isLoading } = useQuery({
        queryKey: ["favorite-cities", favs],
        queryFn: async () => {
            const promises = favs.map((id) => getLocationById(id, locale));
            return Promise.all(promises);
        },
        enabled: favs.length > 0,
    });

    return (
        <div className={styles.body}>
            <h1>Favorites Cities</h1>
            {isLoading || !cities ? (
                <p>LOADING</p>
            ) : (
                <ul className={styles.list}>
                    {cities.map((res) => {
                        if (!res) return undefined;
                        return (
                            <li key={res.id} className={styles.result}>
                                <Link
                                    className={styles.link}
                                    href={`/?location=${res.name}&lat=${res.coords.latitude}&lon=${res.coords.longitude}`}
                                >
                                    <CircleFlag
                                        height={20}
                                        width={20}
                                        countryCode={res.countryCode}
                                    />
                                    <p>
                                        {res.name} -{" "}
                                        {res.admin.charAt(0).toUpperCase() + res.admin.slice(1)},{" "}
                                        {res.country}
                                    </p>
                                </Link>
                                <FavButton locationId={res.id} size='1.5rem' />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
