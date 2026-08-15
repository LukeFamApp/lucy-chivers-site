"use client";

import { forwardRef } from "react";
import type { Book } from "@/lib/books";

interface BookSpineProps {
  book: Book;
  isActive: boolean;
  isOpening: boolean;
  onSelect: (book: Book, el: HTMLButtonElement | null) => void;
}

/**
 * A single upright book spine on the shelf. Tilts outward (rotateY) when
 * `isActive` — either because the cursor is nearest it (desktop) or it has
 * scrolled to the centre of the viewport (touch).
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
        className={`block h-full w-full origin-left rounded-[2px] transition-transform duration-200 ease-out will-change-transform ${
          isOpening ? "scale-105 opacity-0 duration-300" : ""
        }`}
        style={{
          transform: isActive
            ? "rotateY(-11deg) translateX(3px)"
            : "rotateY(0deg) translateX(0px)",
          background: `linear-gradient(90deg, ${book.accent} 0%, ${book.accent}dd 55%, ${book.accent}99 100%)`,
          boxShadow: isActive
            ? "6px 14px 22px rgba(0,0,0,0.55), inset -4px 0 8px rgba(0,0,0,0.35)"
            : "3px 8px 14px rgba(0,0,0,0.4), inset -3px 0 6px rgba(0,0,0,0.3)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* spine label */}
        <span className="flex h-full w-full flex-col items-center justify-between px-2 py-4">
          <span className="text-[0.6rem] uppercase tracking-[0.25em] text-parchment/70">
            {book.bookNumber}
          </span>
          <span
            className="font-display text-base leading-tight text-parchment sm:text-lg"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              letterSpacing: "0.02em",
            }}
          >
            {book.title}
          </span>
          <span
            className="font-display text-xs italic text-parchment/75"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Lucy Chivers
          </span>
        </span>
        {/* spine edge highlight */}
        <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-parchment/20" />
      </span>
    </button>
  );
});

export default BookSpine;
