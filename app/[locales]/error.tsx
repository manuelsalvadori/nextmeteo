"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong, sorry! Try again later</h2>
            <p>(open-meteo api unreacheable)</p>
        </div>
    );
}
