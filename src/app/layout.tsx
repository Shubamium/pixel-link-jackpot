import type { Metadata } from "next";
import { Archivo_Narrow, Inter, Lora } from "next/font/google";
import "./globals.scss";
import { CSSProperties } from "react";

const lora = Lora({ subsets: ["latin"] });
const archivo = Archivo_Narrow({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixelLink JACKPOT",
  description: "Try you luck at the PixelLink JACKPOT and win some prizes",
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
