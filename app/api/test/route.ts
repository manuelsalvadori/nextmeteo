import { getCurrentMeteo, searchLocation } from "@/services/openmeteo";

export async function GET() {
    //console.log(request);
    const coords = await searchLocation("Springfield", "it");
    // console.log(coords);
    // return await getMeteo(coords);
    const current = await getCurrentMeteo(coords[0].coords);
    return new Response(JSON.stringify(current), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
