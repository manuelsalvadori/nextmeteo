import { wmoCodes } from "@/utils/utils";
import { fetchWeatherApi } from "openmeteo";

export async function getMeteo() {
    //console.log(request);

    const params = {
        latitude: 45.4643,
        longitude: 9.1895,
        hourly: ["temperature_2m", "weather_code"],
        daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
        timezone: "auto",
        forecast_days: 1,
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    console.log(
        `\nCoordinates: ${latitude}°N ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    );

    const hourly = response.hourly()!;
    const daily = response.daily()!;
    const weatherCodes = hourly.variables(1)!.valuesArray()!;
    const weatherDescription = Array.from(weatherCodes)?.map(
        (code): { description: string; icon: string } => wmoCodes[code],
    );

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        hourly: {
            time: Array.from(
                {
                    length:
                        (Number(hourly.timeEnd()) - Number(hourly.time())) /
                        hourly.interval(),
                },
                (_, i) =>
                    new Date(
                        (Number(hourly.time()) +
                            i * hourly.interval() +
                            utcOffsetSeconds) *
                            1000,
                    ),
            ),
            temperature_2m: hourly.variables(0)!.valuesArray(),
            // relative_humidity_2m: hourly.variables(1)!.valuesArray(),
            // precipitation_probability: hourly.variables(2)!.valuesArray(),
            // precipitation: hourly.variables(3)!.valuesArray(),
            // rain: hourly.variables(4)!.valuesArray(),
            weather_code: hourly.variables(1)!.valuesArray(),
            weather_description: weatherDescription,
        },
        daily: {
            time: Array.from(
                {
                    length:
                        (Number(daily.timeEnd()) - Number(daily.time())) /
                        daily.interval(),
                },
                (_, i) =>
                    new Date(
                        (Number(daily.time()) +
                            i * daily.interval() +
                            utcOffsetSeconds) *
                            1000,
                    ),
            ),
            weather_code: daily.variables(0)!.valuesArray(),
            temperature_2m_max: daily.variables(1)!.valuesArray(),
            temperature_2m_min: daily.variables(2)!.valuesArray(),
        },
    };

    return new Response(JSON.stringify(weatherData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function searchLocation(searchTerm: string, language: string) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=10&language=${language}&format=json`;
    const responses = await fetch(url);
    return new Response(JSON.stringify(await responses.json()), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
