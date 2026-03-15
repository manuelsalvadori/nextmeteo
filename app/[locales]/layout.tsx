import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Montserrat } from "next/font/google";
import Sidemenu from "@/components/sidemenu/Sidemenu";
import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
    title: "Next Meteo",
    description: "Next Meteo",
};

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
                <NextIntlClientProvider>
                    <QueryProvider>
                        <div className='content'>
                            <Sidemenu />
                            {children}
                        </div>
                    </QueryProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
