// "use client";
import Link from "next/link";
import style from "./navbutton.module.css";
import clsx from "clsx";
import { IconType } from "react-icons";

export type NavbuttonProps = {
    url: string;
    icon: IconType;
    label: string;
    isActive: boolean;
};

export default function Navbutton({
    url,
    icon: Icon,
    label,
    isActive,
}: NavbuttonProps) {
    return (
        <Link
            href={url}
            className={clsx(style.button, isActive && style.active)}
        >
            <Icon size={30} />
            <p>{label}</p>
        </Link>
    );
}
