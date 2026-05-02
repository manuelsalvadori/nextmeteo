import { atomWithStorage, createJSONStorage } from "jotai/utils";
import Cookies from "js-cookie";

export type LastLocationData = {
    id: number;
    location: string;
    lat: number;
    lng: number;
};

const cookieStorage = createJSONStorage<LastLocationData | undefined>(() => ({
    getItem: (key) => {
        const value = Cookies.get(key);
        return value ? value : null;
    },
    setItem: (key, value) => {
        Cookies.set(key, value, { expires: 365, path: "/" });
    },
    removeItem: (key) => {
        Cookies.remove(key);
    },
}));

export const favsAtom = atomWithStorage<LastLocationData | undefined>(
    "lastLocation",
    undefined,
    cookieStorage,
);
