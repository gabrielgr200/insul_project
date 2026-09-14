import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import RouteTransition from "./components/RouteTransition";
import ThemeProvider from "./components/ThemeProvider";
import LanguageProvider from "./components/LanguageProvider";
import "./globals.css";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const newBlack = localFont({
  variable: "--font-new-black",
  src: [
    {
      path: "../public/fonts/New Black/NewBlackTypeface-UltraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/New Black/NewBlackTypeface-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/New Black/NewBlackTypeface-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/New Black/NewBlackTypeface-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/New Black/NewBlackTypeface-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/New Black/NewBlackTypeface-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/New Black/NewBlackTypeface-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Insul - Telas e Arames",
  description: "Site projetado para a Insul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${newBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            <RouteTransition>{children}</RouteTransition>
          </LanguageProvider>
        </ThemeProvider>
      </body>
      {gaMeasurementId && <GoogleAnalytics gaId={gaMeasurementId} />}
    </html>
  );
}
