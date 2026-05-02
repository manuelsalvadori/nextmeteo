"use client";
import { favsAtom } from "@/atoms/favsAtom";
import { useAtom } from "jotai";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import styles from "./favButton.module.css";
import { useRouter } from "@/i18n/navigation";

export default function FavButton({
    locationId,
    size = "2rem",
    refresh = false,
}: {
    locationId: number;
    size?: string;
    refresh?: boolean;
}) {
    const router = useRouter();
    const t = useTranslations("FavButton");
    const [favs, setFavs] = useAtom(favsAtom);
    const isFav = favs.includes(locationId);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFav) {
            setFavs((prev) => prev.filter((n) => n !== locationId));
        } else {
            setFavs((prev) => [...prev, locationId]);
        }

        if (refresh) router.refresh();
    };

    return (
        <button
            style={{ fontSize: size }}
            className={styles.favButton}
            onClick={(e) => handleClick(e)}
            title={isFav ? t("altAdd") : t("altRemove")}
        >
            {isFav ? <HiStar /> : <HiOutlineStar />}
        </button>
    );
}
