import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/utils/provider/query-provider";
import Guard from "@/utils/provider/guard";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "acme hr",
  description: "job with acme hr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Guard>
          <QueryProvider>{children}</QueryProvider>
        </Guard>
      </body>
    </html>
  );
}
