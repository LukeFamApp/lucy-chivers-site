"use client";

import { useSyncExternalStore } from "react";
import {
  getStoreBuyUrls,
  STORE_LABEL,
  type Book,
  type SeriesTheme,
  type Store,
  type TrafficSource,
} from "@/lib/series";
import { readTrafficSource } from "@/lib/trafficSource";

interface BuyButtonsProps {
  book: Book;
  theme: SeriesTheme;
}

const STORES: Store[] = ["uk", "us"];

// The traffic source never changes during a page view, so there is nothing to subscribe to.
const subscribe = () => () => {};
const serverSource = (): TrafficSource => "website";

/**
 * "Buy on Amazon UK" and "Buy on Amazon US". The page is pre-rendered with the
 * website tags; in the browser the links switch to the TikTok or Instagram tags
 * if the visitor arrived from that bio link.
 */
export default function BuyButtons({ book, theme }: BuyButtonsProps) {
  const source = useSyncExternalStore(subscribe, readTrafficSource, serverSource);

  const urls = getStoreBuyUrls(book, source);
  if (!urls) return null;

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {STORES.map((store) => (
        <a
          key={store}
          href={urls[store]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md px-8 py-3 text-center text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90"
          style={{ background: theme.accent, color: theme.buttonText }}
        >
          Buy on {STORE_LABEL[store]}
        </a>
      ))}
    </div>
  );
}
