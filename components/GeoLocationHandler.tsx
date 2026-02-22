"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchLocationName } from "@/services/openmeteo";

export function GeoLocationHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("lat")) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                const name = await searchLocationName({ latitude, longitude });
                router.push(`/?location=${name}&lat=${latitude}&lon=${longitude}`);
            });
        }
    }, [searchParams, router]);

    return null;
}
