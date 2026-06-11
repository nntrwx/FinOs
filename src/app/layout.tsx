import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const syne = Syne({ 
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "FinOs — Your money. Finally making sense.",
  description: "Personal financial dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-[#342E37] text-[#F5F5F5] antialiased">
        {children}
      </body>
    </html>
  );
}