'use client'
import Image from "next/image";
import { DiReact } from "react-icons/di";
import { DiCss3 } from "react-icons/di";
import styles from './header.module.css';
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 0);
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <div className={clsx(styles.header, scrolled && styles.scrolled)}>
        <button>
            <DiCss3 />
        </button>
        <div className={styles.center}>
            <button className={styles.button}>Section1</button>
            <button className={styles.button}>Section2</button>
            <button className={styles.button}>Section3</button>
        </div>
        <div>
            <button><DiReact /></button>
        </div>
    </div>
} 