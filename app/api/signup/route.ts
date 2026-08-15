import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string; name?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const name = (body.name ?? "").trim().slice(0, 100) || null;
  const source = (body.source ?? "unknown").trim().slice(0, 100);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const { error } = await supabase.from("subscribers").insert({
    email,
    name,
    source,
  });

  if (error) {
    // Unique violation on duplicate email
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "That email is already on the list." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Couldn't save your signup. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
