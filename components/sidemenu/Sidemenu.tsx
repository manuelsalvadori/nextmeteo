"use client";
import style from "./sidemenu.module.css";
import Navbutton from "../navbutton/Navbutton";
import { WiDayCloudy, WiWindDeg } from "react-icons/wi";
import { IoIosOptions } from "react-icons/io";
import { usePathname } from "next/navigation";
import Logo from "../logo/Logo";

export default function Sidemenu() {
    const path = usePathname();
    return (
        <menu className={style.sidemenu}>
            <Logo />
            <Navbutton url='/' icon={WiDayCloudy} label='Meteo' isActive={path === "/"} />
            <Navbutton url='/cities' icon={WiWindDeg} label='Città' isActive={path === "/cities"} />
            <Navbutton
                url='/cities'
                icon={IoIosOptions}
                label='Opzioni'
                isActive={path === "/cities"}
            />
            <Navbutton
                url='/cities'
                icon={IoIosOptions}
                label='Account'
                isActive={path === "/cities"}
            />
            <Navbutton
                url='/cities'
                icon={IoIosOptions}
                label='Login'
                isActive={path === "/cities"}
            />
        </menu>
    );
}
