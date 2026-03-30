import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  clearAdminSessionCookie,
} from "../../../../lib/adminAuth";

export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL("/login", request.url));
  res.cookies.set(ADMIN_COOKIE_NAME, "", clearAdminSessionCookie());
  return res;
}

