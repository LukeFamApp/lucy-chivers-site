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
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center">
            <a
              href="https://www.tiktok.com/@lucychiversbooks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-parchment-dim hover:text-ember-light transition-colors"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M16.6 5.82a4.28 4.28 0 0 1-3.13-1.4 4.27 4.27 0 0 1-1.14-2.92h-3.2v13.44a2.59 2.59 0 1 1-2.6-2.59c.19 0 .38.02.56.05V9.2a5.8 5.8 0 0 0-.56-.03A5.79 5.79 0 1 0 12.28 15V9.68a7.4 7.4 0 0 0 4.32 1.38V7.86a4.3 4.3 0 0 1 0 0z" />
              </svg>
              Find me on TikTok · @lucychiversbooks
            </a>
            <div className="text-xs uppercase tracking-[0.2em] text-parchment-dim/70">
              © {new Date().getFullYear()} Lucy Chivers. All stories, no promises about your bedtime.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
