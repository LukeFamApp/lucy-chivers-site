"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  created_at: string;
}

type SortKey = "email" | "name" | "source" | "created_at";

function startOfWeek(d: Date): string {
  const date = new Date(d);
  const day = date.getDay();
  const diff = (day + 6) % 7; // Monday-start week
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date.toISOString().slice(0, 10);
}

export default function AdminDashboard() {
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<Subscriber[] | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetch("/api/admin/subscribers")
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Failed to load subscribers.");
        }
        return res.json();
      })
      .then((data) => setSubscribers(data.subscribers))
      .catch((err) => setError(err.message));
  }, []);

  const bySource = useMemo(() => {
    if (!subscribers) return [];
    const counts = new Map<string, number>();
    for (const s of subscribers) {
      const key = s.source || "unknown";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [subscribers]);

  const byWeek = useMemo(() => {
    if (!subscribers) return [];
    const counts = new Map<string, number>();
    for (const s of subscribers) {
      const key = startOfWeek(new Date(s.created_at));
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0])).slice(-12);
  }, [subscribers]);

  const maxWeekCount = Math.max(1, ...byWeek.map(([, c]) => c));

  const filteredSorted = useMemo(() => {
    if (!subscribers) return [];
    const q = search.trim().toLowerCase();
    let rows = subscribers;
    if (q) {
      rows = rows.filter(
        (s) =>
          s.email.toLowerCase().includes(q) ||
          (s.name ?? "").toLowerCase().includes(q) ||
          (s.source ?? "").toLowerCase().includes(q)
      );
    }
    const sorted = [...rows].sort((a, b) => {
      const av = (a[sortKey] ?? "").toString().toLowerCase();
      const bv = (b[sortKey] ?? "").toString().toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [subscribers, search, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="rounded bg-red-950/40 border border-red-800 px-4 py-3 text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-parchment">Subscribers</h1>
        <button
          onClick={handleLogout}
          className="text-sm uppercase tracking-wide text-parchment-dim hover:text-ember-light"
        >
          Log out
        </button>
      </div>

      {!subscribers ? (
        <p className="mt-8 text-parchment-dim">Loading…</p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-wood-light/40 bg-wood-dark/50 p-5">
              <p className="text-xs uppercase tracking-widest text-parchment-dim">Total subscribers</p>
              <p className="mt-2 font-display text-4xl text-ember-light">{subscribers.length}</p>
            </div>
            <div className="rounded-lg border border-wood-light/40 bg-wood-dark/50 p-5 sm:col-span-2">
              <p className="text-xs uppercase tracking-widest text-parchment-dim">By source</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {bySource.map(([source, count]) => (
                  <span
                    key={source}
                    className="rounded-full bg-void/60 border border-wood-light/40 px-3 py-1 text-xs text-parchment-dim"
                  >
                    {source}: <span className="text-ember-light">{count}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-wood-light/40 bg-wood-dark/50 p-5">
            <p className="text-xs uppercase tracking-widest text-parchment-dim">
              Signups per week (last {byWeek.length})
            </p>
            <div className="mt-4 flex h-32 items-end gap-2">
              {byWeek.map(([week, count]) => (
                <div key={week} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-ember"
                    style={{ height: `${Math.max(4, (count / maxWeekCount) * 100)}%` }}
                    title={`${week}: ${count}`}
                  />
                  <span className="text-[0.6rem] text-parchment-dim/70">{week.slice(5)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="text"
              placeholder="Search email, name, or source…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-wood-light/50 bg-void/60 px-3 py-2 text-sm text-parchment placeholder:text-parchment-dim/60 focus:border-ember focus:outline-none sm:max-w-xs"
            />
            <a
              href="/api/admin/subscribers?format=csv"
              className="rounded-md bg-ember px-4 py-2 text-center text-sm font-medium uppercase tracking-wide text-void hover:bg-ember-light"
            >
              Export CSV
            </a>
          </div>

          <div className="mt-4 overflow-x-auto rounded-lg border border-wood-light/40">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-wood-dark/70 text-parchment-dim">
                <tr>
                  {(["email", "name", "source", "created_at"] as SortKey[]).map((key) => (
                    <th
                      key={key}
                      onClick={() => toggleSort(key)}
                      className="cursor-pointer select-none px-4 py-3 uppercase tracking-wide"
                    >
                      {key === "created_at" ? "Signed up" : key}
                      {sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredSorted.map((s) => (
                  <tr key={s.id} className="border-t border-wood-light/20">
                    <td className="px-4 py-2">{s.email}</td>
                    <td className="px-4 py-2 text-parchment-dim">{s.name || "—"}</td>
                    <td className="px-4 py-2 text-parchment-dim">{s.source || "—"}</td>
                    <td className="px-4 py-2 text-parchment-dim">
                      {new Date(s.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {filteredSorted.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-parchment-dim">
                      No subscribers match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
