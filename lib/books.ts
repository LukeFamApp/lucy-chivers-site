export interface Book {
  /** URL slug, e.g. /books/two-glasses-in */
  slug: string;
  /** Display title */
  title: string;
  /** "Book One", "Book Two", etc. */
  bookLabel: string;
  bookNumber: number;
  /** Back-cover blurb, one string per paragraph */
  blurb: string[];
  /** Optional pull-quote line from the book */
  pullQuote?: string;
  /** Placeholder Amazon KDP link — swap for the real one at launch */
  amazonUrl: string;
  /** Path to cover image once real art exists (falls back to a generated placeholder if missing) */
  coverImage?: string;
  /** Accent colour used for the placeholder spine + cover treatment */
  accent: string;
  /** Slight width variation so the shelf doesn't look uniform, in rem */
  spineWidthRem: number;
}

export const books: Book[] = [
  {
    slug: "two-glasses-in",
    title: "Two Glasses In",
    bookLabel: "Book One",
    bookNumber: 1,
    accent: "#8a2b3c",
    spineWidthRem: 4.4,
    amazonUrl: "https://www.amazon.com/dp/PLACEHOLDER1",
    pullQuote: "“We said one rule. We should have said none.”",
    blurb: [
      "Lucy and Ken have a good marriage. A comfortable one. The kind built on years of knowing exactly what the other person will order at dinner and exactly how the evening will end — or won't.",
      "So when one honest, wine-loosened conversation cracks the door open on something neither of them expected to want, they don't slam it shut. They set a rule: one night, one honesty, no secrets. It should be simple.",
      "It is not simple. It is the beginning of something that will ask them both what their marriage is actually for — and whether wanting more of each other, differently, is its own kind of faithful.",
    ],
  },
  {
    slug: "the-weekend-away",
    title: "The Weekend Away",
    bookLabel: "Book Two",
    bookNumber: 2,
    accent: "#3c4a2b",
    spineWidthRem: 4.9,
    amazonUrl: "https://www.amazon.com/dp/PLACEHOLDER2",
    pullQuote: "“We packed for three days. We didn't pack for this.”",
    blurb: [
      "A rented cottage, no phone signal, and a rule that was supposed to make things easier. Lucy and Ken take the open door from their first conversation and try to walk through it somewhere no one will recognise them.",
      "Away from the routines that usually keep them safe, the weekend becomes less about the arrangement they agreed to and more about the two people who agreed to it — what they're each still hiding, and what they're finally ready to say out loud.",
      "By Sunday night, coming home means something different than it did on Friday.",
    ],
  },
  {
    slug: "a-taste-of-tuscany",
    title: "A Taste of Tuscany",
    bookLabel: "Book Three",
    bookNumber: 3,
    accent: "#7a5a2b",
    spineWidthRem: 4.2,
    amazonUrl: "https://www.amazon.com/dp/PLACEHOLDER3",
    pullQuote: "“The wine was Tuscan. The jealousy was ours.”",
    blurb: [
      "A holiday villa, a bottle a night, and a couple they meet at the market who seem to have solved the thing Lucy and Ken are still figuring out. It should be a relaxing trip. It is not a relaxing trip.",
      "Under the sun and the slow schedule of an Italian summer, old rules stop fitting the way they used to. Lucy and Ken find out that jealousy and desire can share a table — and that the hardest conversations taste better with good wine.",
      "A story about wanting the same person more, even while wanting other things too.",
    ],
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
