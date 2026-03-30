import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../../lib/supabaseServer";
import { getAdminSessionFromCookies } from "../../../../../lib/adminAuth";

const ALLOWED_STATUSES = ["new", "contacted", "converted", "closed"] as const;
type InquiryStatus = (typeof ALLOWED_STATUSES)[number];

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  const session = await getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = context.params;
  const inquiryId = Number.parseInt(id, 10);
  if (!inquiryId || Number.isNaN(inquiryId)) {
    return NextResponse.json({ error: "Invalid inquiry id" }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as
    | { status?: unknown }
    | null;
  const status = body?.status;
  if (typeof status !== "string" || !(ALLOWED_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  const { error } = await supabaseServer
    .from("inquiries")
    .update({ status: status as InquiryStatus })
    .eq("id", inquiryId);

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update status" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

