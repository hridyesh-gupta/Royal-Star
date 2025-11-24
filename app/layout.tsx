
import type { Metadata } from "next";
import { Pacifico, Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import FloatingCartButton from "@/components/FloatingCartButton";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Royal Star Cafe - Fine Swiss Cafe in Geneva",
  description: "Experience exquisite Swiss cuisine and fine dining at Royal Star Cafe in Geneva, Switzerland. Authentic flavors, elegant atmosphere, exceptional service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <FloatingCartButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
