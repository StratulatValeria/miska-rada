import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Layout/Header/Header";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Реєстр документів — Слов'янська міська рада",
  description: "Офіційний реєстр нормативно-правових актів громади",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${inter.className}`}>
        <Header />
        <main className="main-container">{children}</main>
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
