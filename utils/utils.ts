import { WeatherCode } from "@/services/openmeteo";

export function secondsToHours(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours: hours, minutes: minutes };
}

function wmoIcons(icon: string): WeatherIcons {
    return {
        iconSmallPath: `/weatherIcons/${icon}@4x.png`,
        iconLargePath: `/weatherIcons/${icon}@16x.png`,
    };
}

export const wmoCodes: Record<WeatherCode, WeatherIcons> = {
    0: wmoIcons("clear"),

    1: wmoIcons("mostly-clear"),
    2: wmoIcons("partly-cloudy"),
    3: wmoIcons("overcast"),

    45: wmoIcons("fog"),
    48: wmoIcons("rime-fog"),

    51: wmoIcons("light-drizzle"),
    53: wmoIcons("moderate-drizzle"),
    55: wmoIcons("dense-drizzle"),

    80: wmoIcons("light-rain"),
    81: wmoIcons("moderate-rain"),
    82: wmoIcons("heavy-rain"),

    61: wmoIcons("light-rain"),
    63: wmoIcons("moderate-rain"),
    65: wmoIcons("heavy-rain"),

    56: wmoIcons("light-freezing-drizzle"),
    57: wmoIcons("dense-freezing-drizzle"),

    66: wmoIcons("light-freezing-rain"),
    67: wmoIcons("heavy-freezing-rain"),

    71: wmoIcons("slight-snowfall"),
    73: wmoIcons("moderate-snowfall"),
    75: wmoIcons("heavy-snowfall"),

    77: wmoIcons("snowflake"),

    85: wmoIcons("slight-snowfall"),
    86: wmoIcons("heavy-snowfall"),

    95: wmoIcons("thunderstorm"),

    96: wmoIcons("thunderstorm-with-hail"),
    99: wmoIcons("thunderstorm-with-hail"),
};

export type Coordinates = {
    longitude: number;
    latitude: number;
};

export type WeatherIcons = {
    iconLargePath: string;
    iconSmallPath: string;
};

export function waitForSeconds(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export type Location = {
    name: string;
    coords: Coordinates;
};

export type Units = {
    wind_speed: "kmh" | "mph";
    temperature: "celsius" | "fahrenheit";
    precipitation: "mm" | "inch";
};

export const defaultUnits: Units = {
    wind_speed: "kmh",
    temperature: "celsius",
    precipitation: "mm",
};

export function getTempSymbol(temp: Units["temperature"]) {
    return temp === "celsius" ? "°C" : "°F";
}

export function getWindSymbol(temp: Units["wind_speed"]) {
    return temp === "kmh" ? "km/h" : "mph";
}

export function getPrecipitationSymbol(temp: Units["precipitation"]) {
    return temp === "mm" ? "mm" : "″";
}
