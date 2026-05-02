import { getCurrentMeteo, getHourlyMeteo, getWeeklyMeteo } from "@/services/openmeteo";
import { Coordinates } from "@/utils/utils";
import { GeoLocationHandler } from "@/components/GeoLocationHandler";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { LastLocationData } from "@/atoms/lastLocationAtom";
import { LastLocationTracker } from "@/components/lastLocationTracker/lastLocationTracker";
import SearchLocation from "@/components/searchLocation/searchLocation";
import Hourly from "@/components/hourly/hourly";
import Weekly from "@/components/weekly/weekly";
import Daily from "@/components/daily/daily";
import Skeleton from "@/components/skeleton/skeleton";
import ExtraData from "@/components/extraData/extraData";
import style from "./page.module.css";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

type HomeProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: HomeProps) {
    const { id, location, lat, lng, day } = await searchParams;

    const cookieStore = await cookies();
    const rawValue = cookieStore.get("lastLocation")?.value;
    const lastLocation: LastLocationData = rawValue
        ? JSON.parse(decodeURIComponent(rawValue))
        : undefined;

    if (!lat && lastLocation)
        redirect({
            href: `/?id=${lastLocation.id}&location=${lastLocation.location}&lat=${lastLocation.lat}&lon=${lastLocation.lng}`,
            locale: await getLocale(),
        });

    console.log(lastLocation);

    const coords: Coordinates = {
        latitude: Number(lat || 45.4643),
        longitude: Number(lng || 9.1895),
    };
    const name = Array.isArray(location) ? location[0] : location || "Milano";
    const locationId = Number(id || 3173435);
    const displayDay = Number(day || 0);

    const currentMeteo = await getCurrentMeteo(coords, displayDay);
    const hourlyMeteo = await getHourlyMeteo(coords, displayDay);
    const weeklyMeteo = await getWeeklyMeteo(coords);

    return (
        <main className={style.body}>
            <LastLocationTracker
                data={{
                    id: locationId,
                    location: name,
                    lat: coords.latitude,
                    lng: coords.longitude,
                }}
            />
            <Suspense>
                <GeoLocationHandler />
            </Suspense>
            <Suspense>
                <SearchLocation />
            </Suspense>
            <Suspense fallback={<Skeleton className={style.daySkeleton} />}>
                <Daily
                    locationId={locationId}
                    location={name}
                    dailyData={currentMeteo}
                    day={displayDay}
                />
            </Suspense>
            <Suspense fallback={<Skeleton className={style.hoursSkeleton} />}>
                <Hourly data={hourlyMeteo} />
            </Suspense>
            <Suspense fallback={<Skeleton className={style.dataSkeleton} />}>
                <ExtraData data={hourlyMeteo} />
            </Suspense>
            <Suspense fallback={<Skeleton className={style.weekSkeleton} />}>
                <Weekly weeklyData={weeklyMeteo} coords={coords} location={name} />
            </Suspense>
        </main>
    );
}
