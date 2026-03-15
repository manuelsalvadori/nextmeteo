"use client";
import { LocationData } from "@/services/openmeteo";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";
import { CircleFlag } from "react-circle-flags";
import styles from "./searchLocation.module.css";
import clsx from "clsx";

export default function SearchLocation() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selected, setSelected] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [debouncedTerm] = useDebounce(searchTerm, 500);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ["search", debouncedTerm],
        queryFn: async () => {
            const res = await fetch(`/api/searchLocation?query=${debouncedTerm}&lng=it`);
            return res.json();
        },
        placeholderData: (previousData) => (debouncedTerm.length > 2 ? previousData : undefined),
        enabled: debouncedTerm.length > 2,
        staleTime: 1000 * 60 * 5,
    });

    const handleSelect = (data: LocationData) => {
        setSearchTerm("");
        inputRef.current?.blur();
        router.push(
            `/?location=${data.name}&lat=${data.coords.latitude}&lng=${data.coords.longitude}`,
        );
    };

    const handleKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            e.preventDefault();
            inputRef.current?.blur();
        }

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

    const isTyping = searchTerm !== debouncedTerm;

    return (
        <div className={styles.body}>
            <input
                type='text'
                ref={inputRef}
                id='searchLocation'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setSelected(false)}
                onSelect={() => setSelected(true)}
                onKeyDown={(e) => handleKeys(e)}
                placeholder={selected ? "" : "Cerca località..."}
            />
            {searchTerm.length > 2 && selected && (
                <ResultsList
                    data={data}
                    isLoading={isLoading}
                    handleSelect={handleSelect}
                    activeIndex={activeIndex}
                    isTyping={isTyping}
                />
            )}
        </div>
    );
}

function ResultsList({
    data,
    handleSelect,
    isLoading,
    isTyping,
    activeIndex,
}: {
    data: LocationData[] | undefined;
    handleSelect: (res: LocationData) => void;
    isLoading: boolean;
    isTyping: boolean;
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
                        {res.name} - {res.admin.charAt(0).toUpperCase() + res.admin.slice(1)},{" "}
                        {res.country}
                    </li>
                ))
            ) : (
                <p style={{ justifySelf: "center" }}>
                    {isLoading || isTyping ? "Caricamento..." : "Nessun risultato"}
                </p>
            )}
        </ul>
    );
}
