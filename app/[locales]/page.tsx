import Daily from "@/components/daily/daily";
import style from "./page.module.css";
import { getCurrentMeteo, getHourlyMeteo, getWeeklyMeteo } from "@/services/openmeteo";
import { Coordinates } from "@/utils/utils";
import SearchLocation from "@/components/searchLocation/searchLocation";
import { GeoLocationHandler } from "@/components/GeoLocationHandler";
import { Suspense } from "react";
import Hourly from "@/components/hourly/hourly";
import Weekly from "@/components/weekly/weekly";

type HomeProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: HomeProps) {
    const { location, lat, lng } = await searchParams;
    const coords: Coordinates = {
        latitude: Number(lat || 45.4643),
        longitude: Number(lng || 9.1895),
    };
    const name = Array.isArray(location) ? location[0] : location || "Milano";

    const currentMeteo = await getCurrentMeteo(coords);
    const hourlyMeteo = await getHourlyMeteo(coords);
    const weeklyMeteo = await getWeeklyMeteo(coords);

    return (
        <main className={style.body}>
            <Suspense>
                <GeoLocationHandler />
            </Suspense>
            <Suspense>
                <SearchLocation />
            </Suspense>
            <Suspense>
                <Daily location={name} dailyData={currentMeteo} />
            </Suspense>
            <Suspense>
                <Hourly data={hourlyMeteo} />
            </Suspense>
            <Suspense>
                <div className={style.data}></div>
            </Suspense>
            <Suspense>
                <Weekly weeklyData={weeklyMeteo} />
            </Suspense>
        </main>
    );
}
