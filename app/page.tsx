import Bookshelf from "@/components/Bookshelf";
import SignupForm from "@/components/SignupForm";
import { books } from "@/lib/books";

export default function HomePage() {
  return (
    <div>
      <section
        className="relative border-b border-wood-dark"
        style={{
          background:
            "linear-gradient(180deg, #2c1c14 0%, #3a2417 45%, #4a3020 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0px, transparent 2px, transparent 40px, rgba(255,255,255,0.05) 42px)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 pt-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-ember-light">
            Romance, unhurried
          </p>
          <h1 className="mt-3 font-display text-4xl italic text-parchment sm:text-5xl">
            Pull one off the shelf.
          </h1>
        </div>
        <Bookshelf books={books} />
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-[1.1fr_1fr] sm:gap-16">
        <div>
          <h2 className="font-display text-3xl text-parchment">About the writing</h2>
          <div className="mt-4 space-y-4 text-parchment-dim leading-relaxed">
            <p>
              I write about the conversations couples have after the second glass
              of wine — the honest, unglamorous, occasionally reckless ones. My
              stories are about long marriages, real jealousy, and the particular
              kind of intimacy that comes from wanting more, together.
            </p>
            <p>
              Expect firelight, not floodlight. Slow builds, not shock value. If
              you like your romance a little grown-up and a little dangerous,
              you&apos;re in the right place.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <SignupForm source="homepage" />
        </div>
      </section>
    </div>
  );
}
