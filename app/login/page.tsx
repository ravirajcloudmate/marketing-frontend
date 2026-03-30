import { redirect } from "next/navigation";
import { getAdminSessionFromCookies } from "../../lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const session = await getAdminSessionFromCookies();
  if (session) redirect("/admin");

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const error = resolvedSearchParams?.error;
  const errorMessage =
    error === "invalid"
      ? "Invalid email or password."
      : error === "config"
      ? "Admin auth is not configured. Set ADMIN_EMAIL and ADMIN_SESSION_SECRET."
      : error === "missing"
      ? "Please enter your email and password."
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-4 py-12">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Findiy Admin</h1>
          <p className="mt-1 text-sm text-slate-400">
            Sign in to view inquiry submissions.
          </p>
        </div>

          <div className="mb-6 flex rounded-xl border border-slate-800/70 bg-slate-900/20 p-1">
            <div className="flex w-1/2 items-center justify-center rounded-lg bg-slate-900/60 px-3 py-2 text-sm font-semibold text-slate-50">
              Admin Sign In
            </div>
            <a
              href="/register"
              className="flex w-1/2 items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-slate-50"
            >
              Create Account
            </a>
          </div>

        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/35 p-6 shadow-xl shadow-black/20 backdrop-blur">
          <form action="/api/auth/login" method="post" className="space-y-4">
            {errorMessage && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {errorMessage}
              </div>
            )}

            <div>
              <label
                className="mb-2 block text-sm font-semibold text-slate-200"
                htmlFor="email"
              >
                Admin email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@yourcompany.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-slate-50 outline-none transition-all placeholder:text-slate-500 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15"
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold text-slate-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-slate-50 outline-none transition-all placeholder:text-slate-500 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-amber-900/30 transition-all hover:-translate-y-0.5 hover:from-amber-600 hover:to-orange-700"
            >
              Login
            </button>

            <p className="text-xs text-slate-500">
              For security, this portal is protected by server-side authentication.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

