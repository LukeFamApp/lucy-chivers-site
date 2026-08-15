"use client";

import { forwardRef } from "react";
import Image from "next/image";
import type { Book } from "@/lib/series";

interface BookSpineProps {
  book: Book;
  isActive: boolean;
  isOpening: boolean;
  /** Series accent color, used to tint the spine edge so it reads as part of the book. */
  accent: string;
  onSelect: (book: Book, el: HTMLButtonElement | null) => void;
}

/**
 * A book standing face-out on the shelf, showing its real front cover.
 * Built as a genuine small 3D object (perspective + rotateY on a
 * preserve-3d group) rather than a flat image, so tilting it on
 * hover/scroll reveals an actual spine edge and page edge — it reads as a
 * physical book, not a photo card.
 */
const BookSpine = forwardRef<HTMLButtonElement, BookSpineProps>(function BookSpine(
  { book, isActive, isOpening, accent, onSelect },
  ref
) {
  const depthRem = 0.85;

  return (
    <button
      ref={ref}
      type="button"
      data-slug={book.slug}
      onClick={(e) => onSelect(book, e.currentTarget)}
      aria-label={`Read ${book.title} by Lucy Chivers`}
      className="group relative shrink-0 cursor-pointer select-none outline-none"
      style={{
        width: `${book.bookWidthRem}rem`,
        // 5:8 matches the supplied cover art (3 of 5 covers are exactly this
        // ratio; the other two are close at 2:3), so object-cover below only
        // has to trim a sliver rather than zooming unevenly across covers.
        aspectRatio: "5 / 8",
        perspective: "1400px",
      }}
    >
      <span
        className={`relative block h-full w-full transition-transform duration-200 ease-out will-change-transform ${
          isOpening ? "scale-105 opacity-0 duration-300" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: `-${depthRem / 2}rem center`,
          transform: isActive ? "rotateY(-26deg)" : "rotateY(-7deg)",
        }}
      >
        {/* spine edge — the thin strip visible on the left as the book turns */}
        <span
          className="absolute left-0 top-0 h-full rounded-l-[2px]"
          style={{
            width: `${depthRem}rem`,
            background: `linear-gradient(180deg, ${accent} 0%, #000 130%)`,
            transform: `rotateY(90deg) translateZ(-${depthRem / 2}rem)`,
            transformOrigin: "left center",
            boxShadow: "inset -3px 0 6px rgba(0,0,0,0.5)",
          }}
        />

        {/* page edge — thin cream strip on the right, suggests stacked pages */}
        <span
          className="absolute right-0 top-0 h-full"
          style={{
            width: `${depthRem * 0.5}rem`,
            background:
              "repeating-linear-gradient(180deg, #f4ead9 0px, #f4ead9 1.5px, #d8c9ab 1.5px, #d8c9ab 2.5px)",
            transform: `rotateY(-90deg) translateZ(-${depthRem * 0.25}rem)`,
            transformOrigin: "right center",
          }}
        />

        {/* front cover */}
        <span
          className="absolute inset-0 overflow-hidden rounded-[2px]"
          style={{
            transform: `translateZ(${depthRem / 2}rem)`,
            boxShadow: isActive
              ? "10px 22px 32px rgba(0,0,0,0.6)"
              : "5px 12px 18px rgba(0,0,0,0.45)",
          }}
        >
          <Image
            src={book.coverImage}
            alt={`${book.title} cover`}
            fill
            sizes="(max-width: 640px) 40vw, 200px"
            className="object-cover"
            priority={book.bookNumber === 1}
          />
        </span>
      </span>
    </button>
  );
});

export default BookSpine;
