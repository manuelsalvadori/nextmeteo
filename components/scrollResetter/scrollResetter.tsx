"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollResetter() {
    const searchParams = useSearchParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [searchParams]);

    return null;
}
