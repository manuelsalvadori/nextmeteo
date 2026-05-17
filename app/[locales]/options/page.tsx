import UnitsForm from "@/components/unitsForm/unitsForm";
import { defaultUnits, Units } from "@/utils/utils";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const unitsRaw = cookieStore.get("units")?.value;
    const units: Units = unitsRaw ? JSON.parse(decodeURIComponent(unitsRaw)) : defaultUnits;

    return (
        <div>
            OPTIONS: <UnitsForm key={JSON.stringify(units)} units={units} />
        </div>
    );
}
