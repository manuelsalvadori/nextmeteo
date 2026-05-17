"use client";

import { setUnitsAction } from "@/app/actions/setUnitsAction";
import { useRouter } from "@/i18n/navigation";
import { Units } from "@/utils/utils";

export default function UnitsForm({ units }: { units: Units }) {
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const payload: Units = {
            precipitation: formData.get("precipitation") as Units["precipitation"],
            temperature: formData.get("temperature") as Units["temperature"],
            wind_speed: formData.get("wind_speed") as Units["wind_speed"],
        };

        await setUnitsAction(payload);
        router.refresh();
    };

    return (
        <form action={handleSubmit}>
            <select name='precipitation' defaultValue={units.precipitation}>
                <option value='mm'>mm</option>
                <option value='inch'>inch</option>
            </select>

            <select name='temperature' defaultValue={units.temperature}>
                <option value='celsius'>celsius</option>
                <option value='fahrenheit'>fahrenheit</option>
            </select>

            <select name='wind_speed' defaultValue={units.wind_speed}>
                <option value='kmh'>km/h</option>
                <option value='mph'>mph</option>
            </select>

            <button type='submit'>SAVE</button>
        </form>
    );
}
