import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";

export async function POST(request: Request) {
  try {
    const { fullName, email, company, tradeRequirement } = await request.json();

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer.from("inquiries").insert({
      full_name: fullName,
      email,
      company,
      trade_requirement: tradeRequirement,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Could not save inquiry." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Inquiry API error:", err);
    return NextResponse.json(
      { error: "Unexpected error while saving inquiry." },
      { status: 500 }
    );
  }
}

