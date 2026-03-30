import crypto from "crypto";
import { cookies } from "next/headers";
import { supabaseServer } from "./supabaseServer";

export const ADMIN_COOKIE_NAME = "findiy_admin_session";

type AdminSession = {
  adminId: number;
  email: string;
  iat: number; // seconds
  exp: number; // seconds
};

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

const PASSWORD_SALT_BYTES = 16;
const PASSWORD_SCRYPT_KEYLEN = 32;
const PASSWORD_SCRYPT_COST = {
  N: 16384,
  r: 8,
  p: 1,
};

function base64UrlEncode(input: string | Buffer) {
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function timingSafeEqualBuffers(a: Buffer, b: Buffer) {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function getEnvOrNull() {
  return {
    sessionSecret: process.env.ADMIN_SESSION_SECRET ?? null,
  };
}

export function getAdminAuthConfigError() {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  if (!sessionSecret) return "missing_session_secret";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return "missing_supabase_env";

  return null;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

type AdminCredentials = {
  id: number;
  email: string;
};

function hashPassword(password: string) {
  const salt = crypto.randomBytes(PASSWORD_SALT_BYTES);
  const key = crypto.scryptSync(
    password,
    salt,
    PASSWORD_SCRYPT_KEYLEN,
    PASSWORD_SCRYPT_COST
  );
  return {
    saltB64Url: salt.toString("base64url"),
    passwordHashB64Url: key.toString("base64url"),
  };
}

function verifyPassword(params: {
  password: string;
  saltB64Url: string;
  passwordHashB64Url: string;
}) {
  const { password, saltB64Url, passwordHashB64Url } = params;
  const salt = Buffer.from(saltB64Url, "base64url");
  const expected = Buffer.from(passwordHashB64Url, "base64url");
  const actual = crypto.scryptSync(
    password,
    salt,
    PASSWORD_SCRYPT_KEYLEN,
    PASSWORD_SCRYPT_COST
  );
  return timingSafeEqualBuffers(actual, expected);
}

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<AdminCredentials | null> {
  const configError = getAdminAuthConfigError();
  if (configError) return null; // caller decides what to show

  const { sessionSecret } = getEnvOrNull();
  if (!sessionSecret) return null; // auth not configured

  const normalizedEmail = normalizeEmail(email);
  const { data, error } = await supabaseServer
    .from("admins")
    .select("id, email, password_hash, salt")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (error || !data) return null;

  const ok = verifyPassword({
    password,
    saltB64Url: data.salt as string,
    passwordHashB64Url: data.password_hash as string,
  });

  if (!ok) return null;

  const id =
    typeof data.id === "string" ? Number.parseInt(data.id, 10) : data.id;

  if (!id || Number.isNaN(id)) return null;

  return { id, email: data.email as string };
}

export async function hashNewAdminPassword(password: string) {
  return hashPassword(password);
}

export function createAdminSessionToken(admin: AdminCredentials) {
  const { sessionSecret } = getEnvOrNull();
  if (!sessionSecret) {
    throw new Error("Missing ADMIN_SESSION_SECRET environment variable.");
  }

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + SESSION_TTL_SECONDS;

  const payload: AdminSession = {
    adminId: admin.id,
    email: normalizeEmail(admin.email),
    iat,
    exp,
  };
  const payloadJson = JSON.stringify(payload);
  const payloadB64 = base64UrlEncode(payloadJson);

  const sig = crypto
    .createHmac("sha256", sessionSecret)
    .update(payloadB64, "utf8")
    .digest();
  const sigB64 = sig.toString("base64url");

  return `${payloadB64}.${sigB64}`;
}

export async function getAdminSessionFromCookies() {
  const { sessionSecret } = getEnvOrNull();
  if (!sessionSecret) return null;

  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!cookie) return null;

  const parts = cookie.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;

  const payloadJson = (() => {
    try {
      return base64UrlDecode(payloadB64);
    } catch {
      return null;
    }
  })();
  if (!payloadJson) return null;

  const payload = (() => {
    try {
      return JSON.parse(payloadJson) as AdminSession;
    } catch {
      return null;
    }
  })();
  if (!payload || typeof payload.exp !== "number") return null;

  // Verify signature.
  const expectedSig = crypto
    .createHmac("sha256", sessionSecret)
    .update(payloadB64, "utf8")
    .digest();
  const actualSig = Buffer.from(sigB64, "base64url");
  if (!timingSafeEqualBuffers(actualSig, expectedSig)) return null;

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) return null;

  return payload;
}

export function clearAdminSessionCookie() {
  const secure = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

export function adminSessionCookieOptions() {
  const secure = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

