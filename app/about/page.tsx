export const metadata = {
  title: "About | Lucy Chivers",
  description: "A little about Lucy Chivers, the person behind the books.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-ember-light">About</p>
      <h1 className="mt-2 font-display text-4xl text-parchment sm:text-5xl">
        Lucy Chivers
      </h1>

      <div className="mt-8 space-y-5 leading-relaxed text-parchment-dim">
        <p>
          Lucy Chivers is a pen name — which, if you&apos;ve read any of the
          books, will make immediate sense. I write about marriages that are
          honest about what they want, even when what they want is
          complicated. Long dinners. Too much wine. Conversations that start
          as jokes and end up changing everything.
        </p>
        <p>
          I didn&apos;t set out to write romance. I set out to write two
          people who love each other enough to tell each other the truth,
          even the inconvenient parts. It turned out that&apos;s most of what
          romance actually is.
        </p>
        <p>
          Lately that&apos;s split into two shelves. <em>Two Glasses In</em>{" "}
          is the contemporary side — long marriages, real jealousy, too much
          wine. <em>Lost Dynasties</em> is the other thing I apparently
          needed to get out of my system: a sapphic paranormal series set in
          the Scottish Highlands, about a human woman pulled into a war
          between vampire courts and werewolf clans, and the ancient queen
          who was never supposed to want her. Different worlds, same rule —
          I don&apos;t put anything on the page that hasn&apos;t earned it.
        </p>
        <p>
          I live somewhere with decent wine and bad WiFi, which is probably
          why the books keep getting written. If you&apos;ve read one and it
          did something to you — good or complicated — I&apos;d love to hear
          about it. That&apos;s what the mailing list is really for.
        </p>
        <p className="font-display text-xl italic text-parchment">
          Thanks for reading. Pour something first.
        </p>
      </div>
    </div>
  );
}
