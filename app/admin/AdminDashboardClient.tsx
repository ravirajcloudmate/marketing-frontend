"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

type InquiryStatus = "new" | "contacted" | "converted" | "closed";

export type Inquiry = {
  id: number;
  full_name: string;
  email: string;
  contact_number: string | null;
  company: string | null;
  trade_requirement: string | null;
  created_at: string;
  status?: InquiryStatus | null;
};

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

const PRETTY_DATE_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

function formatPrettyDate(iso: string) {
  const d = new Date(iso);
  return PRETTY_DATE_FORMATTER.format(d);
}

function formatRelative(iso: string) {
  const d = new Date(iso);
  const diffMs = d.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  const abs = Math.abs(diffSec);
  if (abs < 60) return rtf.format(diffSec, "second");
  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");
  const diffHr = Math.round(diffMin / 60);
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, "hour");
  const diffDay = Math.round(diffHr / 24);
  return rtf.format(diffDay, "day");
}

function toastTone(tone: "success" | "error") {
  return tone === "success"
    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
    : "border-red-500/30 bg-red-500/10 text-red-200";
}

function statusPill(status: InquiryStatus) {
  switch (status) {
    case "new":
      return "border-sky-500/30 bg-sky-500/10 text-sky-200";
    case "contacted":
      return "border-amber-500/30 bg-amber-500/10 text-amber-200";
    case "converted":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-200";
    case "closed":
      return "border-slate-500/30 bg-slate-500/10 text-slate-200";
  }
}

function normalizeStatus(status: unknown): InquiryStatus {
  if (
    status === "new" ||
    status === "contacted" ||
    status === "converted" ||
    status === "closed"
  ) {
    return status;
  }
  return "new";
}

export function AdminDashboardClient({
  initialInquiries,
}: {
  initialInquiries: Inquiry[];
}) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(
    initialInquiries.map((x) => ({ ...x, status: normalizeStatus(x.status) }))
  );
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"" | InquiryStatus>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [toast, setToast] = useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const fromDate = from ? startOfDay(new Date(from)) : null;
    const toDate = to ? new Date(to) : null;
    if (toDate) toDate.setHours(23, 59, 59, 999);

    return inquiries.filter((x) => {
      const s = normalizeStatus(x.status);
      if (status && s !== status) return false;

      if (needle) {
        const hay = `${x.full_name} ${x.email}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }

      const created = new Date(x.created_at);
      if (fromDate && created < fromDate) return false;
      if (toDate && created > toDate) return false;
      return true;
    });
  }, [inquiries, q, status, from, to]);

  const stats = useMemo(() => {
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = new Date(todayStart);
    weekStart.setDate(todayStart.getDate() - 6);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;

    for (const x of inquiries) {
      const d = new Date(x.created_at);
      if (d >= todayStart) todayCount++;
      if (d >= weekStart) weekCount++;
      if (d >= monthStart) monthCount++;
    }

    return {
      total: inquiries.length,
      today: todayCount,
      week: weekCount,
      month: monthCount,
    };
  }, [inquiries]);

  const exportCsv = () => {
    const rows = filtered;
    const header = [
      "id",
      "created_at",
      "status",
      "full_name",
      "email",
      "contact_number",
      "company",
      "trade_requirement",
    ];

    const esc = (v: unknown) => {
      const s = String(v ?? "");
      if (/[\",\\n]/.test(s)) return `"${s.replace(/\"/g, '""')}"`;
      return s;
    };

    const csv =
      header.join(",") +
      "\n" +
      rows
        .map((r) =>
          [
            r.id,
            r.created_at,
            normalizeStatus(r.status),
            r.full_name,
            r.email,
            r.contact_number ?? "",
            r.company ?? "",
            r.trade_requirement ?? "",
          ]
            .map(esc)
            .join(",")
        )
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const updateStatus = async (id: number, nextStatus: InquiryStatus) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: unknown }
          | null;
        const msg =
          typeof data?.error === "string"
            ? data.error
            : "Failed to update inquiry status.";
        throw new Error(msg);
      }

      startTransition(() => {
        setInquiries((prev) =>
          prev.map((x) => (x.id === id ? { ...x, status: nextStatus } : x))
        );
      });
      setToast({ tone: "success", text: "Inquiry updated." });
    } catch (e: unknown) {
      setToast({
        tone: "error",
        text: e instanceof Error ? e.message : "Error occurred.",
      });
    } finally {
      setSavingId(null);
      window.setTimeout(() => setToast(null), 2200);
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${toastTone(toast.tone)}`}>
          {toast.text}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/20 via-slate-900/40 to-orange-500/15 p-5">
          <div className="text-xs font-semibold text-amber-200/90">Total inquiries</div>
          <div className="mt-2 text-3xl font-bold">{stats.total}</div>
        </div>
        <div className="rounded-2xl border border-sky-500/25 bg-gradient-to-br from-sky-500/20 via-slate-900/40 to-emerald-500/15 p-5">
          <div className="text-xs font-semibold text-sky-200/90">Today</div>
          <div className="mt-2 text-3xl font-bold">{stats.today}</div>
        </div>
        <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/20 via-slate-900/40 to-fuchsia-500/15 p-5">
          <div className="text-xs font-semibold text-violet-200/90">This week</div>
          <div className="mt-2 text-3xl font-bold">{stats.week}</div>
        </div>
        <div className="rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/20 via-slate-900/40 to-teal-500/15 p-5">
          <div className="text-xs font-semibold text-emerald-200/90">This month</div>
          <div className="mt-2 text-3xl font-bold">{stats.month}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/35 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="grid gap-3 md:grid-cols-4 md:items-end">
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-semibold text-slate-400">
                Search (name / email)
              </label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-50 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-400">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "" | InquiryStatus)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2.5 text-sm text-slate-50 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15"
              >
                <option value="">All</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-400">
                  From
                </label>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2.5 text-sm text-slate-50 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-400">
                  To
                </label>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2.5 text-sm text-slate-50 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 md:justify-end">
            <div className="text-xs text-slate-400">
              Showing{" "}
              <span className="text-slate-200 font-semibold">{filtered.length}</span>
              {isPending ? " (updating...)" : ""}
            </div>
            <button
              type="button"
              onClick={exportCsv}
              className="rounded-xl border border-slate-700 bg-slate-950/30 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:border-amber-400 hover:text-amber-200 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-900/35">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gradient-to-r from-slate-950 to-slate-900">
            <tr className="border-b border-slate-800/70 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-bold text-slate-200">Date</th>
              <th className="px-4 py-3 font-bold text-slate-200">Full name</th>
              <th className="px-4 py-3 font-bold text-slate-200">Email</th>
              <th className="px-4 py-3 font-bold text-slate-200">Status</th>
              <th className="px-4 py-3 font-bold text-slate-200">Company</th>
              <th className="px-4 py-3 font-bold text-slate-200">Trade requirement</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inq) => (
              <tr
                key={inq.id}
                className="border-b border-slate-800/60 transition-colors hover:bg-slate-800/55"
              >
                <td className="px-4 py-3 align-top text-xs text-slate-300 whitespace-nowrap">
                  <div className="font-semibold text-slate-200">
                    {formatPrettyDate(inq.created_at)}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-500" suppressHydrationWarning>
                    {mounted ? formatRelative(inq.created_at) : ""}
                  </div>
                </td>
                <td className="px-4 py-3 align-top text-sm font-semibold text-slate-50">
                  {inq.full_name}
                </td>
                <td className="px-4 py-3 align-top text-xs break-all">
                  <a
                    className="text-amber-300 underline-offset-2 hover:underline"
                    href={`mailto:${inq.email}`}
                  >
                    {inq.email}
                  </a>
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusPill(
                        normalizeStatus(inq.status)
                      )}`}
                    >
                      {normalizeStatus(inq.status).toUpperCase()}
                    </span>
                    <select
                      value={normalizeStatus(inq.status)}
                      disabled={savingId === inq.id}
                      onChange={(e) => updateStatus(inq.id, e.target.value as InquiryStatus)}
                      className="rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-xs text-slate-50 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15 disabled:opacity-60"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </td>
                <td className="px-4 py-3 align-top text-sm text-slate-200">
                  {inq.company || "—"}
                </td>
                <td className="px-4 py-3 align-top text-sm text-slate-200 max-w-md">
                  <div className="line-clamp-4">
                    {inq.trade_requirement || "—"}
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td className="px-4 py-10 text-center text-sm text-slate-400" colSpan={6}>
                  No inquiries match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

