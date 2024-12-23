import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "MyTrack",
  description:
    "Transform your music experience! Create personalized music rooms, invite your friends, and enjoy seamless sharing for unforgettable moments.",
  keywords: [
    "music rooms",
    "create music rooms",
    "share music",
    "music experience",
    "music with friends",
    "MyTrack",
    "personalized music",
    "seamless music sharing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.style.fontFamily} ${manrope.className} bg-background`}
      >
        <Providers>
          {children}

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
