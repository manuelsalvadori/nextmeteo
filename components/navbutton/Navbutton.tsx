"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import style from "./navbutton.module.css";
import clsx from "clsx";

export type NavbuttonProps = {
    url: string;
    children: ReactNode;
    label: string;
};

export default function Navbutton({ url, children, label }: NavbuttonProps) {
    const path = usePathname();
    const isActive = path === url;
    return (
        <Link href={url} className={clsx(style.button, isActive && style.active)}>
            {children}
            <p>{label}</p>
        </Link>
    );
}
