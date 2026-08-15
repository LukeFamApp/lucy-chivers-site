"use client";

import { useState, type FormEvent } from "react";

interface SignupFormProps {
  source: string;
  heading?: string;
  description?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm({
  source,
  heading = "Never miss a release",
  description = "One email when a new book drops. No spam, no noise — just an invite back to the shelf.",
}: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMessage("That doesn't look like a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, source }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again in a moment.");
        return;
      }

      setStatus("success");
      setMessage("You're on the list. See you at the next release.");
      setEmail("");
      setName("");
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-ember/40 bg-wood-dark/60 px-6 py-5">
        <p className="font-display text-xl text-ember-light">{message}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-wood-light/40 bg-wood-dark/60 px-6 py-6">
      <h3 className="font-display text-2xl text-parchment">{heading}</h3>
      <p className="mt-1 mb-4 text-sm text-parchment-dim">{description}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row">
          <input
            type="text"
            placeholder="First name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-wood-light/50 bg-void/60 px-3 py-2 text-sm text-parchment placeholder:text-parchment-dim/60 focus:border-ember focus:outline-none sm:w-36"
          />
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full flex-1 rounded-md border border-wood-light/50 bg-void/60 px-3 py-2 text-sm text-parchment placeholder:text-parchment-dim/60 focus:border-ember focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="whitespace-nowrap rounded-md bg-ember px-5 py-2 text-sm font-medium uppercase tracking-wide text-void transition-colors hover:bg-ember-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Joining…" : "Join the list"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-3 text-sm text-wine-light bg-parchment/90 rounded px-3 py-2">{message}</p>
      )}
    </div>
  );
}
