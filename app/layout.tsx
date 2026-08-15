import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Karla } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";

const displaySerif = Cormorant_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const gothicDisplay = Cinzel({
  variable: "--font-display-gothic",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodySans = Karla({
  variable: "--font-body-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lucy Chivers | Romance Fiction",
  description:
    "Lucy Chivers writes intimate contemporary romance (Two Glasses In) and dark paranormal romance (Lost Dynasties). Explore both series and get notified when the next book lands.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${displaySerif.variable} ${gothicDisplay.variable} ${bodySans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-parchment font-sans">
        <NavBar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-wood-light/30 py-8">
          <div className="mx-auto max-w-5xl px-6 text-center text-xs uppercase tracking-[0.2em] text-parchment-dim/70">
            © {new Date().getFullYear()} Lucy Chivers. All stories, no promises about your bedtime.
          </div>
        </footer>
      </body>
    </html>
  );
}
