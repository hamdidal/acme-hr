import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Provider from "../utils/provider/_provider";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "acme hr",
  description: "get job with acme hr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={rubik.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
