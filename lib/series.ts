export interface Book {
  /** URL slug, e.g. /books/two-glasses-in */
  slug: string;
  /** Display title */
  title: string;
  /** "Book One", "Volume 1", etc. */
  bookLabel: string;
  bookNumber: number;
  /** Back-cover blurb, one string per paragraph */
  blurb: string[];
  /** Optional pull-quote line from the book */
  pullQuote?: string;
  /** Placeholder Amazon KDP link — swap for the real one at launch */
  amazonUrl: string;
  /** Path to the real cover image in public/covers/ */
  coverImage: string;
  /** Width of the face-out cover on the shelf, in rem; slight variation avoids a too-uniform row */
  bookWidthRem: number;
}

export interface SeriesTheme {
  /** Primary accent used for headings, buttons, links within this series */
  accent: string;
  accentLight: string;
  /** Shelf background gradient stops */
  shelfFrom: string;
  shelfVia: string;
  shelfTo: string;
  /** Wood/shelf-plank tones */
  plankFrom: string;
  plankTo: string;
  /** Display font family override for this series' headings (CSS font-family stack) */
  displayFont: string;
}

export interface Series {
  slug: string;
  name: string;
  tagline: string;
  theme: SeriesTheme;
  books: Book[];
}

export const series: Series[] = [
  {
    slug: "two-glasses-in",
    name: "Two Glasses In",
    tagline: "Wine, honesty, and marriages brave enough to want more.",
    theme: {
      accent: "#c8813a",
      accentLight: "#e0a35e",
      shelfFrom: "#2c1c14",
      shelfVia: "#3a2417",
      shelfTo: "#4a3020",
      plankFrom: "#6b432a",
      plankTo: "#2c1c14",
      displayFont: "var(--font-display-serif), \"Playfair Display\", Georgia, serif",
    },
    books: [
      {
        slug: "two-glasses-in",
        title: "Two Glasses In",
        bookLabel: "Book One",
        bookNumber: 1,
        coverImage: "/covers/two-glasses-in.jpg",
        bookWidthRem: 8.8,
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
        coverImage: "/covers/weekend-away.jpg",
        bookWidthRem: 8.8,
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
        coverImage: "/covers/taste-of-tuscany.jpg",
        bookWidthRem: 8.8,
        amazonUrl: "https://www.amazon.com/dp/PLACEHOLDER3",
        pullQuote: "“The wine was Tuscan. The jealousy was ours.”",
        blurb: [
          "A holiday villa, a bottle a night, and a couple they meet at the market who seem to have solved the thing Lucy and Ken are still figuring out. It should be a relaxing trip. It is not a relaxing trip.",
          "Under the sun and the slow schedule of an Italian summer, old rules stop fitting the way they used to. Lucy and Ken find out that jealousy and desire can share a table — and that the hardest conversations taste better with good wine.",
          "A story about wanting the same person more, even while wanting other things too.",
        ],
      },
    ],
  },
  {
    slug: "lost-dynasties",
    name: "Lost Dynasties",
    tagline: "A hidden war beneath the Highlands. A queen who shouldn't want her.",
    theme: {
      accent: "#8b2c4a",
      accentLight: "#c2456f",
      shelfFrom: "#08060c",
      shelfVia: "#120c1c",
      shelfTo: "#1a1128",
      plankFrom: "#241832",
      plankTo: "#08060c",
      displayFont: "var(--font-display-gothic), \"Playfair Display\", Georgia, serif",
    },
    books: [
      {
        slug: "a-new-spark",
        title: "A New Spark",
        bookLabel: "Volume One",
        bookNumber: 1,
        coverImage: "/covers/lost-dynasties-1.jpg",
        bookWidthRem: 8.8,
        amazonUrl: "https://www.amazon.com/dp/PLACEHOLDERLD1",
        pullQuote: "“I have ruled longer than your country has had a name. I did not expect you.”",
        blurb: [
          "Anabelle Reid came to the Highlands to bury her grandmother and sell a crumbling stone cottage, not to stumble into a war that has been quietly burning under the heather for six hundred years. The locals warn her not to walk the old drover's road after dark. She doesn't listen.",
          "What finds her there is Carla — ancient, immaculate, and the last true queen of a vampire court that has spent centuries in uneasy truce with the werewolf clans holding the glens. Carla has no use for a mortal woman with her grandmother's stubborn chin and her grandmother's ring. Until she does.",
          "As old alliances fracture and something wakes in the mountains that predates both their kinds, Anabelle finds herself the one thing no one in this world has been in half a millennium: unpredictable. Carla finds herself something she thought she'd outlived the capacity for — interested.",
        ],
      },
      {
        slug: "the-cinder-war",
        title: "The Cinder War",
        bookLabel: "Volume Two",
        bookNumber: 2,
        coverImage: "/covers/lost-dynasties-2.jpg",
        bookWidthRem: 8.8,
        amazonUrl: "https://www.amazon.com/dp/PLACEHOLDERLD2",
        pullQuote: "“They will burn every glen between here and the sea before they let a human sit that close to a throne.”",
        blurb: [
          "The truce is over. What Anabelle and Carla woke on the drover's road didn't stay buried — and now the wolf clans and the older vampire houses both want the same thing: Carla dethroned, and the mortal woman at her side gone, one way or another.",
          "Carla was built for war. She has survived every one the Highlands have thrown at her court for six centuries. What she has never had to survive is fighting one while afraid of losing someone — and Anabelle, who was never supposed to matter, has become the single thing Carla cannot lose and still call the victory worth it.",
          "As the glens burn and old dynasties choose sides, Anabelle has to decide how much of her own life she's willing to spend on a war that was never supposed to be hers. Carla has to decide whether a queen can rule with her heart exposed — and survive it.",
        ],
      },
    ],
  },
];

export function getSeriesBySlug(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug);
}

export function getBookBySlug(bookSlug: string): { series: Series; book: Book } | undefined {
  for (const s of series) {
    const book = s.books.find((b) => b.slug === bookSlug);
    if (book) return { series: s, book };
  }
  return undefined;
}

export function allBooks(): Book[] {
  return series.flatMap((s) => s.books);
}
