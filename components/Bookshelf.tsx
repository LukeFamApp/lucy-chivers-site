"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "@/lib/series";
import BookSpine from "./BookSpine";

interface BookshelfProps {
  books: Book[];
  /** Shelf plank gradient, top -> bottom. Defaults to the warm wood tones. */
  plankFrom?: string;
  plankTo?: string;
  /** Series accent color, tints each book's spine edge. */
  accent: string;
}

export default function Bookshelf({ books, plankFrom, plankTo, accent }: BookshelfProps) {
  const router = useRouter();
  const shelfRef = useRef<HTMLDivElement>(null);
  const spineRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [openingSlug, setOpeningSlug] = useState<string | null>(null);
  // Detect whether this is a fine-pointer/hover-capable device (desktop) vs touch.
  // Lazy-initialized so we don't need to setState synchronously inside an effect;
  // `window` is guarded since this file is a client component but SSR still
  // renders it once on the server first.
  const [hasHover, setHasHover] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  // Keep hasHover in sync if the device's pointer capability changes
  // (e.g. a 2-in-1 laptop switching to tablet mode).
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const listener = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  // Desktop: find the spine nearest the cursor's X position and activate it.
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasHover) return;
      const cursorX = e.clientX;
      let nearestSlug: string | null = null;
      let nearestDist = Infinity;

      spineRefs.current.forEach((el, slug) => {
        const rect = el.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const dist = Math.abs(cursorX - center);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestSlug = slug;
        }
      });

      // Only react if the cursor is reasonably close to a book (within ~130px —
      // roughly half a book's width plus its gap), otherwise let all books rest.
      setActiveSlug(nearestDist < 130 ? nearestSlug : null);
    },
    [hasHover]
  );

  const handleMouseLeave = useCallback(() => {
    if (hasHover) setActiveSlug(null);
  }, [hasHover]);

  // Touch/mobile: lean the book that's nearest the vertical centre of the viewport.
  useEffect(() => {
    if (hasHover) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestSlug: string | null = null;
        let bestRatio = 0;
        entries.forEach((entry) => {
          const slug = (entry.target as HTMLElement).dataset.slug ?? null;
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestSlug = slug;
          }
        });
        if (bestRatio > 0.6) {
          setActiveSlug(bestSlug);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.6, 0.75, 1],
        rootMargin: "-40% 0px -40% 0px", // only counts near vertical centre
      }
    );

    spineRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [hasHover, books.length]);

  function registerSpine(slug: string, el: HTMLButtonElement | null) {
    if (el) spineRefs.current.set(slug, el);
    else spineRefs.current.delete(slug);
  }

  function handleSelect(book: Book) {
    if (openingSlug) return;
    setOpeningSlug(book.slug);
    window.setTimeout(() => {
      router.push(`/books/${book.slug}`);
    }, 190);
  }

  const plankGradient = `linear-gradient(180deg, ${plankFrom ?? "#6b432a"}, ${plankTo ?? "#2c1c14"})`;

  return (
    <div
      ref={shelfRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-x-auto pb-2"
    >
      <div className="flex min-w-max items-end gap-6 px-8 pt-10 sm:gap-10 sm:px-14">
        {books.map((book) => (
          <BookSpine
            key={book.slug}
            book={book}
            accent={accent}
            isActive={activeSlug === book.slug}
            isOpening={openingSlug === book.slug}
            ref={(el) => registerSpine(book.slug, el)}
            onSelect={() => handleSelect(book)}
          />
        ))}
      </div>

      {/* the shelf plank */}
      <div
        className="relative mt-[-2px] h-5 min-w-max shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
        style={{ background: plankGradient }}
      >
        <div className="h-full w-full bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_2px,transparent_2px,transparent_60px)]" />
      </div>
      <div className="h-2 min-w-max" style={{ background: plankTo ?? "#2c1c14" }} />
    </div>
  );
}
