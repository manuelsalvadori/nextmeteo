"server only";
import { Coordinates, WeatherIcons, wmoCodes } from "@/utils/utils";
import { fetchWeatherApi } from "openmeteo";
import z from "zod";

export async function getMeteo(coords: Coordinates) {
    //console.log(request);

    const params = {
        latitude: coords.latitude,
        longitude: coords.longitude,
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
        (code): WeatherIcons => wmoCodes[code as WeatherCode],
    );

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        hourly: {
            time: Array.from(
                {
                    length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval(),
                },
                (_, i) =>
                    new Date(
                        (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000,
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
                    length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
                },
                (_, i) =>
                    new Date(
                        (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000,
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

export async function getHourlyMeteo(coords: Coordinates) {
    //console.log(request);

    const params = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        hourly: ["temperature_2m", "weather_code"],
        timezone: "auto",
        forecast_days: 1,
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

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

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const rawWeatherData = {
        time: Array.from(
            {
                length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval(),
            },
            (_, i) =>
                new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000),
        ),
        temperatures: hourly.variables(0)!.valuesArray(),
        weatherCodes: hourly.variables(1)!.valuesArray(),
    };

    const hourlyArray = rawWeatherData.time.map((t, i) => {
        return {
            time: t,
            temperature: rawWeatherData.temperatures![i],
            weatherCode: rawWeatherData.weatherCodes![i],
        };
    });

    const weatherData = HourlyMeteoArraySchema.parse(hourlyArray);
    return weatherData;
}

export async function getCurrentMeteo(coords: Coordinates): Promise<CurrentMeteoData> {
    const params = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        current: ["temperature_2m", "relative_humidity_2m", "weather_code", "cloud_cover"],
        timezone: "auto",
        forecast_days: 1,
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    const current = response.current()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = CurrentMeteoSchema.parse({
        temperature: current.variables(0)!.value(),
        relativeHumidity: current.variables(1)!.value(),
        weatherCode: current.variables(2)!.value(),
        cloudCover: current.variables(3)!.value(),
    });

    return weatherData;
}

export async function searchLocation(
    searchTerm: string,
    language: string,
): Promise<LocationData[]> {
    console.log("SERVER");
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=100&language=${language}&format=json`;
    const responses = await fetch(url);
    const res = await responses.json();
    const results = GeoSearchResSchema.parse(res).results;
    if (!results) return [];

    return results.map((r): LocationData => {
        return {
            id: r.id,
            coords: { latitude: r.latitude, longitude: r.longitude },
            name: r.name,
            admin: r.admin1 || r.admin2 || r.admin3 || r.admin4 || "N/A",
            country: r.country || "N/A",
            countryCode: r.country_code.toLowerCase(),
        };
    });
}

export async function searchLocationName(coords: Coordinates) {
    const url = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${coords.latitude}&lng=${coords.longitude}&username=nextmeteo&lang=local&cities=cities15000`;
    const responses = await fetch(url);
    const res = await responses.json();
    const names = GeoNameSearchResSchema.parse(res).geonames;
    return names[0].name;
}

export const WeatherCodeSchema = z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(45),
    z.literal(48),
    z.literal(51),
    z.literal(53),
    z.literal(55),
    z.literal(56),
    z.literal(57),
    z.literal(61),
    z.literal(63),
    z.literal(65),
    z.literal(66),
    z.literal(67),
    z.literal(71),
    z.literal(73),
    z.literal(75),
    z.literal(77),
    z.literal(80),
    z.literal(81),
    z.literal(82),
    z.literal(85),
    z.literal(86),
    z.literal(95),
    z.literal(96),
    z.literal(99),
]);

export type WeatherCode = z.infer<typeof WeatherCodeSchema>;

const HourlyMeteoSchema = z.object({
    time: z.date(),
    weatherCode: WeatherCodeSchema,
    temperature: z.number(),
});

const HourlyMeteoArraySchema = z.array(HourlyMeteoSchema);
export type HourlyMeteoData = z.infer<typeof HourlyMeteoSchema>;

const CurrentMeteoSchema = z.object({
    temperature: z.number(),
    relativeHumidity: z.number(),
    weatherCode: WeatherCodeSchema,
    cloudCover: z.number(),
});
export type CurrentMeteoData = z.infer<typeof CurrentMeteoSchema>;
export type LocationData = {
    id: number;
    name: string;
    coords: Coordinates;
    admin: string;
    country: string;
    countryCode: string;
};

const LocationSchema = z.object({
    id: z.number(),
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    elevation: z.number().optional(),
    feature_code: z.string().optional(),
    country_code: z.string(),
    admin1_id: z.number().optional(),
    admin2_id: z.number().optional(),
    admin3_id: z.number().optional(),
    admin4_id: z.number().optional(),
    timezone: z.string().optional(),
    population: z.number().optional(),
    country_id: z.number().optional(),
    country: z.string().optional(),
    admin1: z.string().optional(),
    admin2: z.string().optional(),
    admin3: z.string().optional(),
    admin4: z.string().optional(),
});

const GeoSearchResSchema = z.object({
    results: z.array(LocationSchema).optional(),
});
// es. searchLocation
// {
//   id: 3173435,
//   name: "Milano",
//   latitude: 45.46427,
//   longitude: 9.18951,
//   elevation: 122,
//   feature_code: "PPLA",
//   country_code: "IT",
//   admin1_id: 3174618,
//   admin2_id: 3173434,
//   admin3_id: 6542283,
//   timezone: "Europe/Rome",
//   population: 1371498,
//   country_id: 3175395,
//   country: "Italia",
//   admin1: "Lombardia",
//   admin2: "Provincia di Milano",
//   admin3: "Milano",
// }

const LocationNameSchema = z.object({
    adminCode1: z.string().optional(),
    lng: z.string().optional(),
    distance: z.string().optional(),
    geonameId: z.number().optional(),
    toponymName: z.string().optional(),
    countryId: z.string().optional(),
    fcl: z.string().optional(),
    population: z.number().optional(),
    countryCode: z.string().optional(),
    name: z.string().optional(),
    fclName: z.string().optional(),
    countryName: z.string().optional(),
    fcodeName: z.string().optional(),
    adminName1: z.string().optional(),
    lat: z.string().optional(),
    fcode: z.string().optional(),
});

const GeoNameSearchResSchema = z.object({
    geonames: z.array(LocationNameSchema),
});
// es. searchLocationName
// {
//       "adminCode1": "07",
//       "lng": "12.51133",
//       "distance": "0.00056",
//       "geonameId": 3169070,
//       "toponymName": "Rome",
//       "countryId": "3175395",
//       "fcl": "P",
//       "population": 2318895,
//       "countryCode": "IT",
//       "name": "Roma",
//       "fclName": "city, village,...",
//       "adminCodes1": {
//         "ISO3166_2": "62"
//       },
//       "countryName": "Italia",
//       "fcodeName": "capital of a political entity",
//       "adminName1": "Lazio",
//       "lat": "41.89193",
//       "fcode": "PPLC"
//     }
