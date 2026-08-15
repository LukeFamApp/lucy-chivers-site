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
              className="relative aspect-[2/3] w-full overflow-hidden rounded-sm shadow-2xl"
              style={{ boxShadow: `0 20px 40px rgba(0,0,0,0.6)` }}
            >
              <Image
                src={book.coverImage}
                alt={`${book.title} cover`}
                fill
                sizes="280px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: theme.accentLight }}>
              {s.name} · {book.bookLabel}
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

            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-md px-8 py-3 text-sm font-semibold uppercase tracking-wide text-void transition-opacity hover:opacity-90"
              style={{ background: theme.accent }}
            >
              Read on Kindle
            </a>

            <div className="mt-12">
              <SignupForm
                source={book.slug}
                heading="Want to know when the next one drops?"
                description={`Join the list and get an email the moment a new Lucy Chivers book is live — tagged from ${book.title}.`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
