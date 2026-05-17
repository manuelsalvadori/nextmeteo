import { WiDayCloudy, WiWindDeg } from "react-icons/wi";
import { IoIosOptions } from "react-icons/io";
import Navbutton from "../navbutton/Navbutton";
import Logo from "../logo/Logo";
import style from "./sidemenu.module.css";
import LanguageSwitcher from "../languageSwitcher/languageSwitcher";
import { getTranslations } from "next-intl/server";
import { LuInfo } from "react-icons/lu";

export default async function Sidemenu() {
    const t = await getTranslations("Menu");

    return (
        <menu className={style.sidemenu}>
            <Logo />
            <Navbutton url='/' label={t("meteo")}>
                <WiDayCloudy size={30} />
            </Navbutton>
            <Navbutton url='/cities' label={t("cities")}>
                <WiWindDeg size={30} />
            </Navbutton>
            <Navbutton url='/options' label={t("options")}>
                <IoIosOptions size={30} />
            </Navbutton>
            <Navbutton url='/about' label={t("about")}>
                <LuInfo size={30} />
            </Navbutton>
            <LanguageSwitcher />
        </menu>
    );
}
