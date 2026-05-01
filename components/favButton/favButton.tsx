"use client";
import { favsAtom } from "@/atoms/favsAtom";
import { useAtom } from "jotai";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import styles from "./favButton.module.css";

export default function FavButton({
    locationId,
    size = "2rem",
}: {
    locationId: number;
    size?: string;
}) {
    const [favs, setFavs] = useAtom(favsAtom);
    const isFav = favs.includes(locationId);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        if (isFav) {
            setFavs((prev) => prev.filter((n) => n !== locationId));
        } else {
            setFavs((prev) => [...prev, locationId]);
        }
    };

    return (
        <button
            style={{ fontSize: size }}
            className={styles.favButton}
            onClick={(e) => handleClick(e)}
        >
            {isFav ? <HiStar /> : <HiOutlineStar />}
        </button>
    );
}
