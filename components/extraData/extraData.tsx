"use client";
import { HourlyMeteoData } from "@/services/openmeteo";
import styles from "./extraData.module.css";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TooltipItem,
} from "chart.js";
import { useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { WiRain, WiRaindrop, WiThermometer } from "react-icons/wi";
import { getPrecipitationSymbol, getTempSymbol, Units } from "@/utils/utils";

export type ExtraDataProps = {
    data: HourlyMeteoData[];
    units: Units;
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

// Definiamo i tipi di metriche disponibili
type Metric = "humidity" | "precipitation" | "temperature";

export default function ExtraData({ data, units }: ExtraDataProps) {
    const t = useTranslations("MeteoData");
    const [selectedMetric, setSelectedMetric] = useState<Metric>("temperature");

    const METRIC_CONFIG = {
        temperature: { label: t("temps"), unit: getTempSymbol(units.temperature) },
        humidity: { label: t("humidity"), unit: "%" },
        precipitation: {
            label: t("precipitation"),
            unit: getPrecipitationSymbol(units.precipitation),
        },
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1000,
            easing: "easeInOutQuart" as const,
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#0b131e",
                titleFont: { family: "Montserrat, sans-serif", size: 14 },
                bodyFont: { family: "Montserrat, sans-serif", size: 14 },
                callbacks: {
                    label: (context: TooltipItem<"line">) =>
                        `${context.parsed.y?.toFixed(1)} ${METRIC_CONFIG[selectedMetric].unit}`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    color: "rgba(148, 163, 184, 0.1)",
                },
                ticks: {
                    color: "#94a3b8",
                    font: { family: "Montserrat, sans-serif", size: 11 },
                },
            },
            y: {
                grid: {
                    color: "rgba(148, 163, 184, 0.1)",
                },
                ticks: {
                    color: "#94a3b8",
                    font: { family: "Montserrat, sans-serif", size: 11 },
                    callback: (value: unknown) => `${value}${METRIC_CONFIG[selectedMetric].unit}`,
                },
            },
        },
    };

    const chartData = {
        labels: data.map((d) => `${d.time}`),
        datasets: [
            {
                label: METRIC_CONFIG[selectedMetric].label,
                data: data.map((d) => d[selectedMetric]),
                borderColor: "#ffffff",
                backgroundColor: `#ffffff33`,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };
    return (
        <div className={styles.body}>
            <div className={styles.controls}>
                {getMetricIcon(selectedMetric)}
                <div>
                    {(Object.keys(METRIC_CONFIG) as Metric[]).map((m) => (
                        <button
                            key={m}
                            onClick={() => setSelectedMetric(m)}
                            className={clsx(styles.button, selectedMetric === m && styles.active)}
                        >
                            {METRIC_CONFIG[m].label}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.chart}>
                <Line options={options} data={chartData} />
            </div>
        </div>
    );
}

function getMetricIcon(selectedMetric: Metric) {
    switch (selectedMetric) {
        case "humidity":
            return <WiRaindrop />;
        case "precipitation":
            return <WiRain />;
        case "temperature":
            return <WiThermometer />;
    }
}
