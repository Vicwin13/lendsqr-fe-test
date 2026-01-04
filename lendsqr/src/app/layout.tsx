import "../style/globals.scss";

import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Work_Sans } from "next/font/google";
import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/avenir-next-bold.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/avenir-next-demibold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/avenir-next-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/avenir-next-regular.woff2",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-avenir",
  display: "swap",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lendsqr",
  description: "Mock Test for Lendsqr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${myFont.variable} ${workSans.variable}`}>
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
