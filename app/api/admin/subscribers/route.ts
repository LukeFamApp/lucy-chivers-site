import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

interface SubscriberRow {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  created_at: string;
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const authed = await verifyAdminSessionToken(token);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rows: SubscriberRow[];
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("subscribers")
      .select("id, email, name, source, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;
    rows = data as SubscriberRow[];
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load subscribers." },
      { status: 500 }
    );
  }

  const format = req.nextUrl.searchParams.get("format");

  if (format === "csv") {
    const header = ["email", "name", "source", "created_at"];
    const lines = [
      header.join(","),
      ...rows.map((r) =>
        [r.email, r.name ?? "", r.source ?? "", r.created_at].map(csvEscape).join(",")
      ),
    ];
    const csv = lines.join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="subscribers.csv"`,
      },
    });
  }

  return NextResponse.json({ subscribers: rows });
}
