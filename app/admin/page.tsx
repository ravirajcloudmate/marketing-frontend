import { redirect } from "next/navigation";
import { supabaseServer } from "../../lib/supabaseServer";
import { getAdminSessionFromCookies } from "../../lib/adminAuth";
import { AdminDashboardClient, type Inquiry as InquiryClient } from "./AdminDashboardClient";

function AdminIcon({ name }: { name: "calendar" | "user" | "mail" | "phone" | "building" | "doc" }) {
  const base = "h-4 w-4 shrink-0";
  switch (name) {
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path
            d="M8 3v3m8-3v3M4.5 8.5h15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6.5 5.5h11A2 2 0 0 1 19.5 7.5v12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "user":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path
            d="M20 21a8 8 0 0 0-16 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path
            d="M4 6h16v12H4V6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="m4 7 8 6 8-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.24a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path
            d="M4 21V7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8 9h2M8 13h2M8 17h2M14 9h2M14 13h2M14 17h2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M2 21h20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "doc":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M14 2v6h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8 13h8M8 17h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

type Inquiry = {
  id: number;
  full_name: string;
  email: string;
  contact_number: string | null;
  company: string | null;
  trade_requirement: string | null;
  created_at: string;
  status: "new" | "contacted" | "converted" | "closed";
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSessionFromCookies();
  if (!session) redirect("/login");

  const { data: adminProfile } = await supabaseServer
    .from("admins")
    .select("company_name, email")
    .eq("id", session.adminId)
    .maybeSingle();

  if (!adminProfile) {
    // Session cookie is present, but admin record can't be found.
    // Clear session via API route (cookie modifications must happen in a route handler).
    redirect("/api/auth/logout");
  }

  const { data, error } = await supabaseServer
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const inquiries = (data ?? []) as Inquiry[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-md shadow-amber-500/20">
                <img src="/logo.png" alt="Findiy logo" className="h-8 w-auto" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Findiy Admin</h1>
                <p className="text-xs text-slate-400">
                  Manage inquiry submissions from your landing page.
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Signed in as <span className="text-slate-200">{adminProfile.company_name}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-xs font-semibold text-slate-200">
                Inquiries: {inquiries.length}
              </div>
              <div className="hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-1 text-xs font-semibold text-white sm:inline-flex">
                Live Portal
              </div>
              <form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-amber-400 hover:text-amber-200"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-4">
          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/15 via-red-500/5 to-slate-900/20 px-4 py-3 text-sm text-red-200">
              Failed to load inquiries from Supabase.
            </div>
          )}

          {inquiries.length === 0 && !error ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/35 p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800">
                  <AdminIcon name="calendar" />
                </div>
                <div>
                  <div className="text-sm font-bold">No inquiries yet</div>
                  <div className="mt-1 text-sm text-slate-400">
                    When someone submits the form on the landing page, they will appear here.
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {inquiries.length > 0 && (
          <AdminDashboardClient initialInquiries={inquiries as unknown as InquiryClient[]} />
        )}
      </main>
    </div>
  );
}

