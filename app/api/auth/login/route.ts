import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  adminSessionCookieOptions,
  createAdminSessionToken,
  verifyAdminCredentials,
} from "../../../../lib/adminAuth";

function redirectToLogin(request: Request, error: string) {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

export async function POST(request: Request) {
  let email: string | undefined;
  let password: string | undefined;

  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as {
      email?: unknown;
      password?: unknown;
    };
    if (typeof body.email === "string") email = body.email;
    if (typeof body.password === "string") password = body.password;
  } else {
    const formData = await request.formData();
    const fdEmail = formData.get("email");
    const fdPassword = formData.get("password");
    if (typeof fdEmail === "string") email = fdEmail;
    if (typeof fdPassword === "string") password = fdPassword;
  }

  if (!email || !password) {
    return redirectToLogin(request, "missing");
  }

  const admin = await verifyAdminCredentials(email, password);
  if (!admin) {
    return redirectToLogin(request, "invalid");
  }

  let token: string;
  try {
    token = createAdminSessionToken(admin);
  } catch {
    return redirectToLogin(request, "config");
  }

  const res = NextResponse.redirect(new URL("/admin", request.url));
  res.cookies.set(ADMIN_COOKIE_NAME, token, adminSessionCookieOptions());
  return res;
}

