import type { Metadata } from "next";
import { Inter, Poppins, Fira_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import GoogleSessionProvider from "@/components/SessionProvider";
import Footer from "@/components/Footer";
import ConvexClientProvider from "./ConvexClientProvider";

const fira_Sans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fira_Sans.className} linearcolor`}>
        <GoogleSessionProvider>
          <ConvexClientProvider>
            <Header />
            <div className="">{children}</div>
            <Footer />
          </ConvexClientProvider>
        </GoogleSessionProvider>
      </body>
    </html>
  );
}
