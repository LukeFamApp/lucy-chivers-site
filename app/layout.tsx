import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const displaySerif = Cormorant_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bodySans = Karla({
  variable: "--font-body-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lucy Chivers | Romance Fiction",
  description:
    "Lucy Chivers writes intimate, wine-and-firelight romance. Explore the books and get notified when the next one lands.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${displaySerif.variable} ${bodySans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-parchment font-sans">
        <header className="border-b border-wood-light/30">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="font-display text-2xl tracking-wide text-parchment hover:text-ember-light transition-colors"
            >
              Lucy Chivers
            </Link>
            <div className="flex items-center gap-6 font-sans text-sm uppercase tracking-[0.15em] text-parchment-dim">
              <Link href="/" className="hover:text-ember-light transition-colors">
                Books
              </Link>
              <Link href="/about" className="hover:text-ember-light transition-colors">
                About
              </Link>
            </div>
          </nav>
        </header>
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
