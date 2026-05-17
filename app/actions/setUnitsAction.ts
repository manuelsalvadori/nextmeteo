"use server";

import { Units } from "@/utils/utils";
import { cookies } from "next/headers";

export async function setUnitsAction(value: Units) {
    const cookieStore = await cookies();

    cookieStore.set("units", JSON.stringify(value), {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
    });
}
