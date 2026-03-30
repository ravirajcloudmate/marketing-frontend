import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabaseServer";
import {
  ADMIN_COOKIE_NAME,
  adminSessionCookieOptions,
  createAdminSessionToken,
  hashNewAdminPassword,
} from "../../../../lib/adminAuth";

function redirectToRegister(request: Request, error: string) {
  const url = new URL("/register", request.url);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

export async function POST(request: Request) {
  let companyName: string | undefined;
  let email: string | undefined;
  let password: string | undefined;

  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as {
      companyName?: unknown;
      email?: unknown;
      password?: unknown;
    };
    if (typeof body.companyName === "string") companyName = body.companyName;
    if (typeof body.email === "string") email = body.email;
    if (typeof body.password === "string") password = body.password;
  } else {
    const formData = await request.formData();
    const fdCompany = formData.get("companyName");
    const fdEmail = formData.get("email");
    const fdPassword = formData.get("password");
    if (typeof fdCompany === "string") companyName = fdCompany;
    if (typeof fdEmail === "string") email = fdEmail;
    if (typeof fdPassword === "string") password = fdPassword;
  }

  if (!companyName || !email || !password) {
    return redirectToRegister(request, "missing");
  }

  if (password.length < 6) {
    return redirectToRegister(request, "weak");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedCompany = companyName.trim();

  // Enforce single-admin registration:
  // If there's already any admin row, block new registrations.
  const { data: existingAdmin, error: existingError } = await supabaseServer
    .from("admins")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (!existingError && existingAdmin) {
    return redirectToRegister(request, "single_exists");
  }

  // Create password hash (server-side only).
  const { saltB64Url, passwordHashB64Url } = await hashNewAdminPassword(
    password
  );

  const { data, error } = await supabaseServer
    .from("admins")
    .insert({
      company_name: normalizedCompany,
      email: normalizedEmail,
      salt: saltB64Url,
      password_hash: passwordHashB64Url,
    })
    .select("id, email")
    .maybeSingle();

  if (error || !data) {
    // Most likely: unique violation for email.
    return redirectToRegister(request, "exists");
  }

  let token: string;
  try {
    const id =
      typeof data.id === "string" ? Number.parseInt(data.id, 10) : data.id;
    if (!id || Number.isNaN(id as number)) {
      return redirectToRegister(request, "config");
    }
    token = createAdminSessionToken({
      id: id as number,
      email: data.email,
    });
  } catch {
    return redirectToRegister(request, "config");
  }

  const res = NextResponse.redirect(new URL("/admin", request.url));
  res.cookies.set(ADMIN_COOKIE_NAME, token, adminSessionCookieOptions());
  return res;
}

