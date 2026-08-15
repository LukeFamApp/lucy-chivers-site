"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Couldn't reach the server.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-6">
      <h1 className="font-display text-3xl text-parchment">Admin</h1>
      <p className="mt-1 text-sm text-parchment-dim">Enter the shared password to continue.</p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <input
          type="password"
          required
          autoFocus
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border border-wood-light/50 bg-void/60 px-3 py-2 text-sm text-parchment focus:border-ember focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-ember px-4 py-2 text-sm font-medium uppercase tracking-wide text-void hover:bg-ember-light disabled:opacity-60"
        >
          {loading ? "Checking…" : "Log in"}
        </button>
        {error && <p className="text-sm text-wine-light bg-parchment/90 rounded px-3 py-2">{error}</p>}
      </form>
    </div>
  );
}
