import { NextResponse } from "next/server";
import { searchLocation } from "@/services/openmeteo";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")!;
    const lng = searchParams.get("lng")!;

    const data = await searchLocation(query, lng);
    return NextResponse.json(data);
}
