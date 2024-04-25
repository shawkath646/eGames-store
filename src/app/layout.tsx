import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SHAS from "shas-app-controller";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "eGames store",
    template: "%s | eGames store"
  },
  description: "Elevate your gaming experience with eGames Store, your premier e-commerce destination for all things gaming. Explore a vast array of offerings including game currencies, Google Play gift cards, subscriptions to various video streaming platforms, and more. With a wide range of payment methods available, seamless order completion is assured for swift and convenient transactions.",
  authors: {
    name: "Shawkat Hossain Maruf",
    url: "https://sh-portfolio-maker.vercel.app/p/shawkath646"
  },
  category: "ecommerce",
  creator: "Shawkat Hossain Maruf",
  keywords: ["NextJS 14", "CloudBurst Lab", "eGames store", "ecommerce", "Game shop", "games", "google play", "gift cards", "subscription", "vouchers", "SH Maruf", "shawkath646"],
  metadataBase: new URL(process.env.APP_BASE_URL as string),
  publisher: "CloudBurst Lab",
  openGraph: {
    countryName: "Bangladesh",
    emails: "shawkath646@gmail.com",
    releaseDate: "25-Apr-2024",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const { ContentWrapper } = await SHAS({ imageOptimization: true });

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContentWrapper>
          <Navbar />
          {children}
          <Footer />
        </ContentWrapper>
      </body>
    </html>
  );
}
