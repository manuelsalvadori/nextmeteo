import Daily from "@/components/daily/daily";
import style from "./page.module.css";
import { getCurrentMeteo } from "@/services/openmeteo";
import { Coordinates } from "@/utils/utils";
import SearchLocation from "@/components/searchLocation/searchLocation";

type HomeProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: HomeProps) {
    const { location, lat, lon } = await searchParams;
    const coords: Coordinates = {
        latitude: Number(lat || 45.4643),
        longitude: Number(lon || 9.1895),
    };
    const name = Array.isArray(location) ? location[0] : location || "Milano";

    const currentMeteo = await getCurrentMeteo(coords);

    return (
        <main className={style.body}>
            <SearchLocation />
            <Daily location={name} currentMeteoData={currentMeteo} />
            <div className={style.week}></div>
            <div className={style.data}></div>
            <div className={style.hours}></div>
        </main>
    );
}
