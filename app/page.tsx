import SeriesShelf from "@/components/SeriesShelf";
import SignupForm from "@/components/SignupForm";
import { series } from "@/lib/series";

export default function HomePage() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-6 pt-14 pb-8 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-ember-light">
          Romance, in two very different keys
        </p>
        <h1 className="mt-3 font-display text-4xl italic text-parchment sm:text-5xl">
          Pull one off the shelf.
        </h1>
      </div>

      {series.map((s) => (
        <SeriesShelf key={s.slug} s={s} />
      ))}

      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-[1.1fr_1fr] sm:gap-16">
        <div>
          <h2 className="font-display text-3xl text-parchment">About the writing</h2>
          <div className="mt-4 space-y-4 text-parchment-dim leading-relaxed">
            <p>
              I write in two very different registers. Under{" "}
              <span className="text-ember-light">Two Glasses In</span>, it&apos;s the
              conversations couples have after the second glass of wine — honest,
              unglamorous, occasionally reckless. Under{" "}
              <span className="text-[#c2456f]">Lost Dynasties</span>, it&apos;s
              something darker: a hidden war under the Highlands and a queen who
              was never supposed to want anyone again.
            </p>
            <p>
              Different worlds, same rule — slow builds, real stakes, and nothing
              on the page that didn&apos;t earn its place.
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
