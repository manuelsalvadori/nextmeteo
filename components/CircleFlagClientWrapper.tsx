"use client";
import { CircleFlag } from "react-circle-flags";

export type CircleFlagClientWrapperProps = {
    height: number;
    width: number;
    countryCode: string;
};

export default function CircleFlagClientWrapper({
    height,
    width,
    countryCode,
}: CircleFlagClientWrapperProps) {
    return <CircleFlag height={height} width={width} countryCode={countryCode} />;
}
