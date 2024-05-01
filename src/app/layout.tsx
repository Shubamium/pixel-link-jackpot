import type { Metadata } from "next";
import { Archivo_Narrow, Inter, Lora } from "next/font/google";
import "./globals.scss";
import { CSSProperties } from "react";

const lora = Lora({ subsets: ["latin"] });
const archivo = Archivo_Narrow({ subsets: ["latin"] });

const meta = {
  title: "PixelLink JACKPOT",
  description: "Try you luck at the PixelLink JACKPOT and win some prizes",
};

const title = meta.title;

const description = meta.description;
const banner = "https://i.ibb.co/S3M61SR/banner.png";

export const metadata: Metadata = {
  title: title,
  description: description,
  metadataBase: new URL("https://google.com"),
  openGraph: {
    url: "https://google.com",
    title: title,
    description: description,
    authors: "shubamium",
    images: [banner],
  },
  twitter: {
    title: title,
    card: "summary_large_image",
    images: [banner],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={lora.className}
        style={
          {
            "--fontMain": lora.style.fontFamily,
            "--fontAlt": archivo.style.fontFamily,
          } as CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
