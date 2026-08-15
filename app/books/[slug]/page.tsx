import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SignupForm from "@/components/SignupForm";
import { allBooks, getBookBySlug } from "@/lib/series";

export function generateStaticParams() {
  return allBooks().map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = getBookBySlug(slug);
  if (!found) return {};
  return {
    title: `${found.book.title} | Lucy Chivers`,
    description: found.book.blurb[0],
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = getBookBySlug(slug);
  if (!found) notFound();
  const { series: s, book } = found;
  const { theme } = s;

  return (
    <div
      className="min-h-full"
      style={{
        background: `linear-gradient(180deg, ${theme.shelfFrom} 0%, ${theme.shelfTo} 100%)`,
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-14">
        <Link
          href={`/#${s.slug}`}
          className="text-sm uppercase tracking-[0.2em] text-parchment-dim hover:text-ember-light transition-colors"
        >
          ← Back to {s.name}
        </Link>

        <div className="mt-8 grid gap-12 sm:grid-cols-[280px_1fr]">
          <div className="mx-auto w-full max-w-[280px]">
            <div
              className="relative aspect-[5/8] w-full overflow-hidden rounded-sm shadow-2xl"
              style={{ boxShadow: `0 20px 40px rgba(0,0,0,0.6)` }}
            >
              {book.coverImage ? (
                <Image
                  src={book.coverImage}
                  alt={`${book.title} cover`}
                  fill
                  sizes="280px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  className="flex h-full w-full flex-col items-center justify-between p-6 text-center"
                  style={{ background: `linear-gradient(160deg, ${theme.accent} 0%, #000 140%)` }}
                >
                  <span className="mt-2 text-xs uppercase tracking-[0.3em] text-parchment/60">
                    {book.bookLabel}
                  </span>
                  <span className="flex flex-col items-center gap-3">
                    <span className="h-px w-12 bg-parchment/40" />
                    <span className="text-sm font-semibold uppercase tracking-[0.25em] text-parchment/90">
                      Coming
                      <br />
                      Soon
                    </span>
                    <span className="h-px w-12 bg-parchment/40" />
                  </span>
                  <span className="mb-1 text-xs italic text-parchment/60">Lucy Chivers</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: theme.accentLight }}>
              {s.name} · {book.bookLabel}
              {book.comingSoon ? " · Coming soon" : ""}
            </p>
            <h1
              className="mt-2 text-4xl sm:text-5xl text-parchment"
              style={{ fontFamily: theme.displayFont }}
            >
              {book.title}
            </h1>

            {book.pullQuote && (
              <p
                className="mt-6 border-l-2 pl-4 font-display text-xl italic text-parchment-dim"
                style={{ borderColor: theme.accent }}
              >
                {book.pullQuote}
              </p>
            )}

            <div className="mt-6 space-y-4 leading-relaxed text-parchment-dim">
              {book.blurb.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {book.amazonUrl ? (
              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-md px-8 py-3 text-sm font-semibold uppercase tracking-wide text-void transition-opacity hover:opacity-90"
                style={{ background: theme.accent }}
              >
                Read on Kindle
              </a>
            ) : (
              <span
                className="mt-8 inline-block rounded-md border px-8 py-3 text-sm font-semibold uppercase tracking-wide"
                style={{ borderColor: theme.accent, color: theme.accentLight }}
              >
                Not yet available
              </span>
            )}

            <div className="mt-12">
              <SignupForm
                source={book.slug}
                heading={
                  book.comingSoon
                    ? "Be the first to know when it's out"
                    : "Want to know when the next one drops?"
                }
                description={
                  book.comingSoon
                    ? `Join the list and get an email the moment ${book.title} has a cover, a date, and a way to buy it.`
                    : `Join the list and get an email the moment a new Lucy Chivers book is live — tagged from ${book.title}.`
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
