"use client";
import { favsAtom } from "@/atoms/favsAtom";
import { useAtom } from "jotai";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import styles from "./favButton.module.css";

export default function FavButton({ locationId }: { locationId: number }) {
    const [favs, setFavs] = useAtom(favsAtom);
    const isFav = favs.includes(locationId);

    const handleClick = () => {
        if (isFav) {
            setFavs((prev) => prev.filter((n) => n !== locationId));
        } else {
            setFavs((prev) => [...prev, locationId]);
        }
    };

    return (
        <button className={styles.favButton} onClick={handleClick}>
            {isFav ? <HiStar /> : <HiOutlineStar />}
        </button>
    );
}
