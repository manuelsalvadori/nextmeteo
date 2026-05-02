"use client";
import { useEffect } from "react";
import { LastLocationData } from "@/atoms/lastLocationAtom";
import Cookies from "js-cookie";

export function LastLocationTracker({ data }: { data: LastLocationData }) {
    useEffect(() => {
        Cookies.set("lastLocation", JSON.stringify(data), { expires: 7, path: "/" });
    }, [data]);

    return null;
}
