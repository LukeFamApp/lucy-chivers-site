import Bookshelf from "./Bookshelf";
import type { Series } from "@/lib/series";

/**
 * One themed "room" on the homepage — a section heading + tagline sitting
 * above a shelf styled for that series. Background stays simple/dark so the
 * real cover art carries the visual weight, not competing shelf textures.
 */
export default function SeriesShelf({ s }: { s: Series }) {
  const { theme } = s;
  return (
    <section
      id={s.slug}
      className="relative scroll-mt-20 border-b"
      style={{
        background: `linear-gradient(180deg, ${theme.shelfFrom} 0%, ${theme.shelfVia} 45%, ${theme.shelfTo} 100%)`,
        borderColor: theme.plankTo,
      }}
    >
      <div className="mx-auto max-w-5xl px-6 pt-12 text-center">
        <h2
          className="text-3xl italic sm:text-4xl"
          style={{ color: theme.accentLight, fontFamily: theme.displayFont }}
        >
          {s.name}
        </h2>
        <p className="mt-2 text-sm text-parchment-dim/90 sm:text-base">{s.tagline}</p>
      </div>
      <Bookshelf books={s.books} plankFrom={theme.plankFrom} plankTo={theme.plankTo} accent={theme.accent} />
    </section>
  );
}
