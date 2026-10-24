export interface Book {
  /** URL slug, e.g. /books/two-glasses-in */
  slug: string;
  /** Display title */
  title: string;
  /** Optional subtitle shown under the title on the book page */
  subtitle?: string;
  /** Optional small line shown under the title, e.g. "A Two Glasses In story" */
  kicker?: string;
  /** "Book One", "Volume 1", etc. */
  bookLabel: string;
  bookNumber: number;
  /** Back-cover blurb, one string per paragraph */
  blurb: string[];
  /** Optional pull-quote line from the book */
  pullQuote?: string;
  /**
   * Amazon ASIN. Builds https://www.amazon.co.uk/dp/<ASIN>. While this is still a
   * bracketed placeholder like "[UNWRAPPED_ASIN]", the book shows as "Coming soon"
   * with no buy button. Replace the placeholder with the real ASIN to go live.
   */
  asin?: string;
  /** Full buy link, for books that use a short link instead of an ASIN. */
  amazonUrl?: string;
  /** Path to the real cover image in public/covers/. Omitted for unannounced covers. */
  coverImage?: string;
  /** Width of the face-out cover on the shelf, in rem */
  bookWidthRem: number;
  /** Optional link shown on the book page, e.g. back to a related series */
  relatedLink?: { label: string; href: string };
}

export interface SeriesTheme {
  /** Primary accent used for headings, buttons, links within this series */
  accent: string;
  accentLight: string;
  /** Text colour used on top of `accent` (buy button) */
  buttonText: string;
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
  /** Optional longer intro shown under the tagline on the shelf */
  intro?: string;
  /** Optional link shown under the tagline on the shelf */
  crossLink?: { label: string; href: string };
  theme: SeriesTheme;
  books: Book[];
}

const ASIN_RE = /^[A-Z0-9]{10}$/;

/** The buy link for a book, or undefined if it has no real ASIN / link yet. */
export function getBuyUrl(book: Book): string | undefined {
  if (book.asin && ASIN_RE.test(book.asin)) {
    return `https://www.amazon.co.uk/dp/${book.asin}`;
  }
  return book.amazonUrl;
}

/** A book with no real buy link yet is shown as "Coming soon". */
export function isComingSoon(book: Book): boolean {
  return !getBuyUrl(book);
}

export const series: Series[] = [
  {
    slug: "two-glasses-in",
    name: "Two Glasses In",
    tagline: "Wine, honesty, and marriages brave enough to want more.",
    crossLink: { label: "Josh's own story", href: "/#bristol-after-dark" },
    theme: {
      accent: "#c8813a",
      accentLight: "#e0a35e",
      buttonText: "#1b120f",
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
        title: "Two Glasses In: The Second Anniversary",
        bookLabel: "Book One",
        bookNumber: 1,
        coverImage: "/covers/two-glasses-in-1.jpg",
        bookWidthRem: 8.8,
        asin: "B0HDK3BZYR",
        pullQuote: "“We said one rule. We should have said none.”",
        blurb: [
          "Lucy and Ken have a good marriage. A comfortable one. The kind built on years of knowing exactly what the other person will order at dinner, and exactly how the evening will end, or won't.",
          "So when one honest, wine-loosened conversation cracks the door open on something neither of them expected to want, they don't slam it shut. They set a rule: one night, one honesty, no secrets. It should be simple.",
          "It is not simple. It is the beginning of something that will ask them both what their marriage is actually for, and whether wanting more of each other, differently, is its own kind of faithful.",
        ],
      },
      {
        slug: "the-weekend-away",
        title: "The Weekend Away",
        bookLabel: "Book Two",
        bookNumber: 2,
        coverImage: "/covers/two-glasses-in-2.jpg",
        bookWidthRem: 8.8,
        asin: "B0HF44667W",
        pullQuote: "“We packed for three days. We didn't pack for this.”",
        blurb: [
          "A rented cottage, no phone signal, and a rule that was supposed to make things easier. Lucy and Ken take the open door from their first conversation and try to walk through it somewhere no one will recognise them.",
          "Away from the routines that usually keep them safe, the weekend becomes less about the arrangement they agreed to and more about the two people who agreed to it, what they're each still hiding, and what they're finally ready to say out loud.",
          "By Sunday night, coming home means something different than it did on Friday.",
        ],
      },
      {
        slug: "a-taste-of-tuscany",
        title: "A Taste of Tuscany",
        bookLabel: "Book Three",
        bookNumber: 3,
        coverImage: "/covers/two-glasses-in-3.jpg",
        bookWidthRem: 8.8,
        asin: "B0HFBDHPC5",
        pullQuote: "“The wine was Tuscan. The jealousy was ours.”",
        blurb: [
          "A holiday villa, a bottle a night, and a couple they meet at the market who seem to have solved the thing Lucy and Ken are still figuring out. It should be a relaxing trip. It is not a relaxing trip.",
          "Under the sun and the slow schedule of an Italian summer, old rules stop fitting the way they used to. Lucy and Ken find out that jealousy and desire can share a table, and that the hardest conversations taste better with good wine.",
          "A story about wanting the same person more, even while wanting other things too.",
        ],
      },
      {
        slug: "an-open-invitation",
        title: "An Open Invitation",
        bookLabel: "Book Four",
        bookNumber: 4,
        coverImage: "/covers/two-glasses-in-4.jpg",
        bookWidthRem: 8.8,
        asin: "B0HL5816YG",
        pullQuote: "“We weren't looking for anyone else. And then someone asked.”",
        blurb: [
          "Three books in, Lucy and Ken thought they knew the shape of their own rules, one night, one honesty, no secrets, and always, always just the two of them deciding. Then a weekend away with old friends turns into a conversation neither of them saw coming: an invitation, offered carefully, to open the circle wider.",
          "It should be an easy no. It isn't. Lucy finds herself wanting to say yes for reasons that have nothing to do with Ken, and everything to do with who she's become since that first honest conversation over wine. Ken finds himself watching her want it, and discovering that jealousy and hope can sit in the same chest at once.",
          "An Open Invitation is about the moment a couple's private arrangement stops being private, and what it costs, and gives back, to let someone else all the way in.",
        ],
      },
      {
        slug: "unwrapped",
        title: "Unwrapped",
        subtitle: "A Steamy Open Marriage MMF Romance",
        bookLabel: "Book Five",
        bookNumber: 5,
        coverImage: "/covers/two-glasses-in-5.jpg",
        bookWidthRem: 8.8,
        asin: "B0HNPBX3KQ",
        blurb: [
          "Twenty years married. One secret. And a birthday she will never forget.",
          "Ken Fletcher has never kept anything from his wife. Not in twenty years of marriage, and certainly not since the night Lucy asked him a question, two glasses in, that opened up their marriage and changed everything. But Lucy's birthday is coming, and Ken is planning the one fantasy she has only ever whispered. It needs Josh. It needs Emily and James. It needs careful planning, a little practice, and a promise that when the moment finally comes, Lucy will still be free to say no.",
          "Unwrapped is the fifth Two Glasses In novel, and the longest yet. Warm, funny and very steamy, it is a love story about a long marriage, an open door and the people who walk through it.",
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
      buttonText: "#f4ead9",
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
        amazonUrl: "https://amzn.eu/d/0905xEkC",
        pullQuote: "“I have ruled longer than your country has had a name. I did not expect you.”",
        blurb: [
          "Anabelle Reid came to the Highlands to bury her grandmother and sell a crumbling stone cottage, not to stumble into a war that has been quietly burning under the heather for six hundred years. The locals warn her not to walk the old drover's road after dark. She doesn't listen.",
          "What finds her there is Carla, ancient, immaculate, and the last true queen of a vampire court that has spent centuries in uneasy truce with the werewolf clans holding the glens. Carla has no use for a mortal woman with her grandmother's stubborn chin and her grandmother's ring. Until she does.",
          "As old alliances fracture and something wakes in the mountains that predates both their kinds, Anabelle finds herself the one thing no one in this world has been in half a millennium: unpredictable. Carla finds herself something she thought she'd outlived the capacity for, interested.",
        ],
      },
      {
        slug: "the-cinder-war",
        title: "The Cinder War",
        bookLabel: "Volume Two",
        bookNumber: 2,
        coverImage: "/covers/lost-dynasties-2.jpg",
        bookWidthRem: 8.8,
        amazonUrl: "https://amzn.eu/d/0j9R8lQF",
        pullQuote: "“They will burn every glen between here and the sea before they let a human sit that close to a throne.”",
        blurb: [
          "The truce is over. What Anabelle and Carla woke on the drover's road didn't stay buried, and now the wolf clans and the older vampire houses both want the same thing: Carla dethroned, and the mortal woman at her side gone, one way or another.",
          "Carla was built for war. She has survived every one the Highlands have thrown at her court for six centuries. What she has never had to survive is fighting one while afraid of losing someone, and Anabelle, who was never supposed to matter, has become the single thing Carla cannot lose and still call the victory worth it.",
          "As the glens burn and old dynasties choose sides, Anabelle has to decide how much of her own life she's willing to spend on a war that was never supposed to be hers. Carla has to decide whether a queen can rule with her heart exposed, and survive it.",
        ],
      },
      {
        slug: "volume-three",
        title: "Volume Three",
        bookLabel: "Volume Three",
        bookNumber: 3,
        bookWidthRem: 8.8,
        blurb: [
          "The war isn't over, and neither is Anabelle and Carla's story. Volume Three is still being written, join the mailing list to hear about the cover reveal and release date first.",
        ],
      },
    ],
  },
  {
    slug: "bristol-after-dark",
    name: "Bristol After Dark",
    tagline: "Bristol has a different side once the lights go down.",
    intro:
      "Josh is a personal trainer with an easy smile and a habit of looking after everyone but himself. For a year he has been the perfect guest in other people's adventures. Now he's starting some of his own. Steamy, warm and very British, each book is a standalone M/M story with a hopeful ending. Set in the world of Two Glasses In. No prior reading needed.",
    theme: {
      accent: "#9b1420",
      accentLight: "#e9803a",
      buttonText: "#f4ead9",
      shelfFrom: "#060507",
      shelfVia: "#0e0a0c",
      shelfTo: "#170c0e",
      plankFrom: "#2a1214",
      plankTo: "#060507",
      displayFont: "var(--font-display-playfair), Georgia, serif",
    },
    books: [
      {
        slug: "devil-in-the-detail",
        title: "Devil in the Detail",
        subtitle: "A Steamy Halloween M/M Romance Novella",
        kicker: "A Two Glasses In story",
        bookLabel: "Book One",
        bookNumber: 1,
        coverImage: "/covers/devil-in-the-detail.jpg",
        bookWidthRem: 8.8,
        asin: "B0HP384C8J",
        relatedLink: { label: "Meet Josh first in Two Glasses In", href: "/#two-glasses-in" },
        blurb: [
          "Come as something you're not.",
          "Josh has spent a year being the perfect guest. Then an invitation arrives: black card, orange ink, a big house in Clifton on Halloween night. Costume compulsory. So Josh goes as the devil. Red glitter, black leather, a pair of horns, and a question he has never asked himself: what happens when the man who always waits to be told starts doing the telling?",
          "A steamy standalone Halloween novella and the first of Josh's own books from the world of Two Glasses In.",
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
