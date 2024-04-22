import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SHAS from "shas-app-controller";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eGames store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { ContentWrapper } = await SHAS();

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
