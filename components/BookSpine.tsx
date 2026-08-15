"use client";

import { forwardRef } from "react";
import Image from "next/image";
import type { Book } from "@/lib/series";

interface BookSpineProps {
  book: Book;
  isActive: boolean;
  isOpening: boolean;
  onSelect: (book: Book, el: HTMLButtonElement | null) => void;
}

/**
 * A single book standing upright on the shelf, showing its real cover art.
 * Tilts outward (rotateY) when `isActive` — either because the cursor is
 * nearest it (desktop) or it has scrolled to the centre of the viewport
 * (touch).
 */
const BookSpine = forwardRef<HTMLButtonElement, BookSpineProps>(function BookSpine(
  { book, isActive, isOpening, onSelect },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      data-slug={book.slug}
      onClick={(e) => onSelect(book, e.currentTarget)}
      aria-label={`Read ${book.title} by Lucy Chivers`}
      className="group relative shrink-0 cursor-pointer select-none outline-none"
      style={{
        width: `${book.spineWidthRem}rem`,
        height: "19rem",
        perspective: "800px",
      }}
    >
      <span
        className={`relative block h-full w-full origin-left overflow-hidden rounded-[3px] transition-transform duration-200 ease-out will-change-transform ${
          isOpening ? "scale-105 opacity-0 duration-300" : ""
        }`}
        style={{
          transform: isActive
            ? "rotateY(-11deg) translateX(3px)"
            : "rotateY(0deg) translateX(0px)",
          boxShadow: isActive
            ? "8px 18px 28px rgba(0,0,0,0.6), inset -3px 0 6px rgba(0,0,0,0.35)"
            : "4px 10px 16px rgba(0,0,0,0.45), inset -2px 0 5px rgba(0,0,0,0.3)",
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={book.coverImage}
          alt={`${book.title} cover`}
          fill
          sizes="(max-width: 640px) 30vw, 200px"
          className="object-cover"
          priority={book.bookNumber === 1}
        />
        {/* spine edge highlight */}
        <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-white/15" />
      </span>
    </button>
  );
});

export default BookSpine;
