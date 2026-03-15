import { WiDayCloudy, WiWindDeg } from "react-icons/wi";
import { IoIosOptions } from "react-icons/io";
import Navbutton from "../navbutton/Navbutton";
import Logo from "../logo/Logo";
import style from "./sidemenu.module.css";

export default function Sidemenu() {
    return (
        <menu className={style.sidemenu}>
            <Logo />
            <Navbutton url='/' label='Meteo'>
                <WiDayCloudy size={30} />
            </Navbutton>
            <Navbutton url='/cities' label='Città'>
                <WiWindDeg size={30} />
            </Navbutton>
            <Navbutton url='/cities' label='Opzioni'>
                <IoIosOptions size={30} />
            </Navbutton>
            <Navbutton url='/cities' label='Account'>
                <IoIosOptions size={30} />
            </Navbutton>
            <Navbutton url='/cities' label='Login'>
                <IoIosOptions size={30} />
            </Navbutton>
        </menu>
    );
}
