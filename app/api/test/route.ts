import { getMeteo } from "@/services/openmeteo";

export async function GET() {
    //console.log(request);
    return await getMeteo();
}
