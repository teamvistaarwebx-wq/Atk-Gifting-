import { Cormorant_Garamond, Fraunces, Urbanist } from "next/font/google";
import Header from "@/components/Header";
import QuoteForm from "@/components/QuoteForm";
import Toasts from "@/components/Toasts";
import HoldWatcher from "@/components/HoldWatcher";
import "./globals.css";

const urbanist = Urbanist({ variable: "--font-urbanist", subsets: ["latin"] });

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Atulya Karigari — Gifting",
  description:
    "Handpicked sarees, handicraft and sweets, packed into one box with a message from you.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${fraunces.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <QuoteForm />
        <Toasts />
        <HoldWatcher />
      </body>
    </html>
  );
}
