import type { Book } from "@/lib/books";

/**
 * Placeholder cover art, generated from CSS until real cover designs exist.
 * Swap in <img src={book.coverImage}> once real art is available.
 */
export default function BookCover({ book, className = "" }: { book: Book; className?: string }) {
  return (
    <div
      className={`relative flex aspect-[2/3] w-full flex-col items-center justify-between overflow-hidden rounded-sm p-6 text-center shadow-2xl ${className}`}
      style={{
        background: `linear-gradient(160deg, ${book.accent} 0%, #1b120f 115%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div className="relative mt-4 h-px w-10 bg-parchment/50" />
      <div className="relative flex flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.3em] text-parchment/70">
          {book.bookLabel}
        </span>
        <h3 className="font-display text-3xl leading-tight text-parchment sm:text-4xl">
          {book.title}
        </h3>
      </div>
      <div className="relative mb-4 flex flex-col items-center gap-2">
        <div className="h-px w-10 bg-parchment/50" />
        <span className="font-display text-lg italic text-parchment/80">Lucy Chivers</span>
      </div>
    </div>
  );
}
