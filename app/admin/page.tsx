import { supabaseServer } from "../../lib/supabaseServer";

type Inquiry = {
  id: number;
  full_name: string;
  email: string;
  contact_number: string | null;
  company: string | null;
  trade_requirement: string | null;
  created_at: string;
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { data, error } = await supabaseServer
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const inquiries = (data ?? []) as Inquiry[];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Findiy Admin</h1>
          <span className="text-xs text-slate-400">
            Inquiries: {inquiries.length}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-lg font-semibold mb-4">Inquiry Submissions</h2>

        {error && (
          <div className="mb-4 rounded border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
            Failed to load inquiries from Supabase.
          </div>
        )}

        {inquiries.length === 0 && !error ? (
          <p className="text-sm text-slate-400">
            No inquiries found yet. When someone submits the form on the
            landing page, they will appear here.
          </p>
        ) : null}

        {inquiries.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/60">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900">
                <tr className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Contact Number</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Trade Requirement</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="border-b border-slate-800/60 hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-3 align-top text-xs text-slate-300">
                      {new Date(inq.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 align-top text-sm font-medium text-slate-50">
                      {inq.full_name}
                    </td>
                    <td className="px-4 py-3 align-top text-xs break-all">
                      <a
                        className="text-amber-300 underline-offset-2 hover:underline"
                        href={`mailto:${inq.email}?subject=${encodeURIComponent(
                          "Regarding your inquiry — Findiy"
                        )}&body=${encodeURIComponent(
                          `Hi ${inq.full_name},\n\nThanks for reaching out to Findiy.\n\nCompany: ${inq.company ?? "—"}\nTrade requirement: ${inq.trade_requirement ?? "—"}\n\n—\nFindiy Team`
                        )}`}
                      >
                        {inq.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-200 whitespace-nowrap">
                      {inq.contact_number || "—"}
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-200">
                      {inq.company || "—"}
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-200 max-w-md">
                      {inq.trade_requirement || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

