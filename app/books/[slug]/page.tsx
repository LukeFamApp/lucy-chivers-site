import { notFound } from "next/navigation";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import SignupForm from "@/components/SignupForm";
import { books, getBookBySlug } from "@/lib/books";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};
  return {
    title: `${book.title} | Lucy Chivers`,
    description: book.blurb[0],
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <Link
        href="/"
        className="text-sm uppercase tracking-[0.2em] text-parchment-dim hover:text-ember-light transition-colors"
      >
        ← Back to the shelf
      </Link>

      <div className="mt-8 grid gap-12 sm:grid-cols-[280px_1fr]">
        <div className="mx-auto w-full max-w-[280px]">
          <BookCover book={book} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ember-light">
            {book.bookLabel}
          </p>
          <h1 className="mt-2 font-display text-4xl text-parchment sm:text-5xl">
            {book.title}
          </h1>

          {book.pullQuote && (
            <p className="mt-6 border-l-2 border-ember pl-4 font-display text-xl italic text-parchment-dim">
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
            className="mt-8 inline-block rounded-md bg-ember px-8 py-3 text-sm font-semibold uppercase tracking-wide text-void transition-colors hover:bg-ember-light"
          >
            Read on Kindle
          </a>

          <div className="mt-12">
            <SignupForm
              source={book.slug}
              heading={`Want to know when the next one drops?`}
              description={`Join the list and get an email the moment a new Lucy Chivers book is live — tagged from ${book.title}.`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
