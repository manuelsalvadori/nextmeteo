import { atomWithStorage } from "jotai/utils";

export const favsAtom = atomWithStorage<number[]>("favs", []);
