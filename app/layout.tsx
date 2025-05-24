import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterSection from "@/components/footer";
import { Header } from "@/components/header";
import AuthProvider from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Menyro – Discover & Book Restaurants",
  description:
    "Explore the best restaurants in the Balkans and Europe. Browse menus, view locations, and book your table easily with Menyro.",
  metadataBase: new URL("https://menyro.com"),
  openGraph: {
    title: "Menyro – Discover & Book Restaurants",
    description:
      "Explore restaurants, view menus, and book tables easily across the Balkans and Europe.",
    url: "https://menyro.com",
    siteName: "Menyro",
    images: [
      {
        url: "/og-image.jpg", // Replace with your actual image path
        width: 1200,
        height: 630,
        alt: "Menyro Restaurant Booking",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Menyro – Discover & Book Restaurants",
    description:
      "Explore restaurants and book tables easily across the Balkans and Europe.",
    images: ["/og-image.jpg"], // Replace if needed
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          {children}
          <FooterSection />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
