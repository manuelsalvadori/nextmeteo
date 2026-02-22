"use client";
import { LocationData, searchLocation } from "@/services/openmeteo";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";
import { CircleFlag } from "react-circle-flags";
import styles from "./searchLocation.module.css";
import clsx from "clsx";

export default function SearchLocation() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selected, setSelected] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [debouncedQuery] = useDebounce(searchTerm, 500);
    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ["search", debouncedQuery],
        queryFn: async () => {
            return await searchLocation(debouncedQuery, "it");
        },
        enabled: debouncedQuery.length > 2,
        staleTime: 1000 * 60 * 5,
    });

    const handleSelect = (data: LocationData) => {
        setSearchTerm("");
        router.push(
            `/?location=${data.name}&lat=${data.coords.latitude}&lon=${data.coords.longitude}`,
        );
    };

    const handleKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!data?.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev));
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
        }

        if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            handleSelect(data[activeIndex]);
        }
    };

    return (
        <div className={styles.body}>
            <input
                type='text'
                id='searchLocation'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setSelected(false)}
                onSelect={() => setSelected(true)}
                onKeyDown={(e) => handleKeys(e)}
                placeholder='Cerca località...'
            />
            {searchTerm.length > 2 && selected && (
                <ResultsList
                    data={data}
                    isLoading={isLoading}
                    handleSelect={handleSelect}
                    activeIndex={activeIndex}
                />
            )}
        </div>
    );
}

function ResultsList({
    data,
    handleSelect,
    isLoading,
    activeIndex,
}: {
    data: LocationData[] | undefined;
    handleSelect: (res: LocationData) => void;
    isLoading: boolean;
    activeIndex: number;
}) {
    return (
        <ul className={styles.resultsList}>
            {data && data.length > 0 ? (
                data.slice(0, 10).map((res, i) => (
                    <li
                        className={clsx(styles.result, activeIndex === i && styles.active)}
                        key={res.id}
                        onMouseDown={() => {
                            handleSelect(res);
                        }}
                    >
                        <CircleFlag height={20} width={20} countryCode={res.countryCode} />
                        {res.name} - {res.admin}, {res.country}
                    </li>
                ))
            ) : (
                <p style={{ justifySelf: "center" }}>
                    {isLoading ? "Caricamento..." : "Nessun risultato"}
                </p>
            )}
        </ul>
    );
}
