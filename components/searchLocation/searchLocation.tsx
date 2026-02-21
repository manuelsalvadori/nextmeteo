"use client";

import { LocationData, searchLocation } from "@/services/openmeteo";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import styles from "./searchLocation.module.css";
import { useRouter } from "next/navigation";

export default function SearchLocation() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedQuery] = useDebounce(searchTerm, 500);

    const { data, isLoading } = useQuery({
        queryKey: ["search", debouncedQuery],
        queryFn: async () => {
            return await searchLocation(debouncedQuery, "it");
        },
        enabled: debouncedQuery.length > 2,
        staleTime: 1000 * 60 * 5,
    });

    const handleSelect = (data: LocationData) => {
        router.push(
            `/?location=${data.name}&lat=${data.coords.latitude}&lon=${data.coords.longitude}`,
        );
    };

    return (
        <div className={styles.body}>
            <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Cerca località...'
            />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className={styles.resultsList}>
                    {data &&
                        data.slice(0, 10).map((res) => (
                            <li
                                className={styles.result}
                                key={res.id}
                                onClick={() => handleSelect(res)}
                            >
                                {res.name} - {res.admin}, {res.country}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
