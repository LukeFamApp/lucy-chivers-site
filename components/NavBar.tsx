"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/#two-glasses-in", label: "Two Glasses In" },
  { href: "/#lost-dynasties", label: "Lost Dynasties" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-wood-light/30 bg-void">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-2xl tracking-wide text-parchment hover:text-ember-light transition-colors"
          onClick={() => setOpen(false)}
        >
          Lucy Chivers
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 font-sans text-sm uppercase tracking-[0.15em] text-parchment-dim sm:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ember-light transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span
            className={`block h-[2px] w-6 bg-parchment transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`block h-[2px] w-6 bg-parchment transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-[2px] w-6 bg-parchment transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-wood-light/30 px-6 py-4 sm:hidden">
          <div className="flex flex-col gap-4 font-sans text-sm uppercase tracking-[0.15em] text-parchment-dim">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-ember-light transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
