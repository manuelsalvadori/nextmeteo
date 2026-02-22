import type { Metadata } from "next";
import "./globals.css";
//import { League_Spartan } from "next/font/google";
import { Montserrat } from "next/font/google";
import Sidemenu from "@/components/sidemenu/Sidemenu";
import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
    title: "Next Meteo",
    description: "Next Meteo",
};

// const alanSans = Alan_Sans({
//     subsets: ["latin"],
//     variable: "--alanSans",
//     display: "swap",
//     fallback: ["ui-sans-serif", "system-ui", "Arial"],
// });

const workSans = Montserrat({
    subsets: ["latin"],
    variable: "--workSans",
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className={workSans.variable}>
            <body>
                <QueryProvider>
                    <div className='content'>
                        <Sidemenu />
                        {children}
                    </div>
                </QueryProvider>
            </body>
        </html>
    );
}
