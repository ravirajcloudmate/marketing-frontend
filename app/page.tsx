"use client";

import { FormEvent, useEffect, useState } from "react";

function Icon({
  name,
  className,
}: {
  name:
    | "import"
    | "export"
    | "ship"
    | "consult"
    | "leaf"
    | "fabric"
    | "factory"
    | "cog"
    | "bag"
    | "spark"
    | "shield"
    | "globe";
  className?: string;
}) {
  const common = `h-5 w-5 ${className ?? ""}`;
  switch (name) {
    case "import":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M12 3v11m0 0 4-4m-4 4-4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 21h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "export":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M12 21V10m0 0 4 4m-4-4-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 3h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "ship":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M3 18h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 17 6 9h12l2 8-8 3-8-3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8 9V5h8v4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "consult":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M12 20c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 2.1 1.05 4.01 2.77 5.37L6 20l3.2-1.02c.88.26 1.82.4 2.8.4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9 12h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M20 4c-7 1-12 6-13 13 7-1 12-6 13-13Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M7 17c-1.5 1-3 2-3 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "fabric":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M7 4h10v16H7z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9 8h6M9 12h6M9 16h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "factory":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M4 20V9l6 3V9l6 3V7l4 2v11H4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8 20v-4m4 4v-6m4 6v-3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "cog":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M19.4 15a7.8 7.8 0 0 0 .1-1l2-1.2-2-3.5-2.3.5a7.4 7.4 0 0 0-.8-.8l.5-2.3-3.5-2-1.2 2a7.8 7.8 0 0 0-1-.1l-1.2-2-3.5 2 .5 2.3c-.28.25-.55.52-.8.8l-2.3-.5-2 3.5 2 1.2a7.8 7.8 0 0 0 .1 1l-2 1.2 2 3.5 2.3-.5c.25.28.52.55.8.8l-.5 2.3 3.5 2 1.2-2c.33.05.66.08 1 .1l1.2 2 3.5-2-.5-2.3c.28-.25.55-.52.8-.8l2.3.5 2-3.5-2-1.2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bag":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M6 8h12l-1 13H7L6 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9 8a3 3 0 0 1 6 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M12 2l1.2 4.2L17.4 8 13.2 9.2 12 13.4 10.8 9.2 6.6 8l4.2-1.8L12 2Z"
            fill="currentColor"
          />
          <path
            d="M19 13l.8 2.8L22 17l-2.2.6L19 20l-.8-2.4L16 17l2.2-1.2L19 13Z"
            fill="currentColor"
            opacity="0.85"
          />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M12 2 20 6v7c0 5-3.5 9-8 9s-8-4-8-9V6l8-4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M3 12h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 3c3 3 3 15 0 18-3-3-3-15 0-18Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("findiy-theme");
    const initial = stored === "dark" ? "dark" : "light";
    setTheme(initial);
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("findiy-theme", next);
      }
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="mr-3 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/60 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm hover:bg-white"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [company, setCompany] = useState("");
  const [tradeRequirement, setTradeRequirement] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          contactNumber,
          company,
          tradeRequirement,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send inquiry.");
      }

      setMessage("Inquiry sent successfully. We will contact you soon.");
      setFullName("");
      setEmail("");
      setContactNumber("");
      setCompany("");
      setTradeRequirement("");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a
              href="/"
              className="flex items-center gap-3"
              aria-label="Go to home"
            >
              <img src="/logo.png" alt="Findiy logo" className="h-9 w-auto" />
              <span className="text-2xl font-bold tracking-tight">Findiy</span>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm text-slate-700 dark:text-slate-200">
              <a className="hover:text-slate-900 dark:hover:text-white" href="#about">
                About
              </a>
              <a className="hover:text-slate-900 dark:hover:text-white" href="#services">
                Services
              </a>
              <a className="hover:text-slate-900 dark:hover:text-white" href="#industries">
                Industries
              </a>
              <a className="hover:text-slate-900 dark:hover:text-white" href="#network">
                Network
              </a>
              <a className="hover:text-slate-900 dark:hover:text-white" href="#testimonials">
                Testimonials
              </a>
              <a className="hover:text-slate-900 dark:hover:text-white" href="#contact">
                Contact
              </a>
              <a
                className="rounded-full border border-slate-300/80 px-3 py-1 text-xs font-semibold text-slate-600 transition-colors hover:border-amber-300 hover:text-amber-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-amber-400 dark:hover:text-amber-300"
                href="/admin"
              >
                Admin
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm dark:border-slate-700"
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200/70 dark:border-slate-800/70">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(2, 6, 23, 0.92), rgba(2, 6, 23, 0.35)), url(https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=2400&q=80)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.25),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.18),transparent_35%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-amber-300/90 backdrop-blur">
              <Icon name="spark" className="h-4 w-4" />
              PREMIUM GLOBAL TRADE PARTNER
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">
              Connecting Global Markets Through Trusted Import &amp; Export
              Solutions
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-200/90 leading-relaxed">
              Findiy helps businesses scale across borders through reliable
              sourcing, structured exports, and resilient logistics partnerships.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-900/30 transition-all hover:-translate-y-0.5 hover:from-amber-600 hover:to-orange-700"
              >
                Get a Quote <span aria-hidden>↗</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
              >
                Contact Us
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <img
                src="/logo.png"
                alt="FinDiy LE Import Export logo"
                className="h-10 w-auto"
              />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-100">
                  FinDiy LE Import Export
                </div>
                <div className="text-xs text-slate-200/90">
                  Enterprise-grade global import & export support
                </div>
              </div>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { k: "25+", v: "Trade Routes" },
                { k: "400+", v: "Shipments" },
                { k: "98%", v: "Client Satisfaction" },
              ].map((item) => (
                <div
                  key={item.v}
                  className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur"
                >
                  <div className="text-xl font-semibold text-amber-300">{item.k}</div>
                  <div className="mt-1 text-xs text-slate-200">{item.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                  About Findiy
                </h2>
                <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                  Founded by{" "}
                  <span className="font-semibold">John Colombe</span>, Findiy
                  is a next-generation import-export firm focused on building
                  resilient, high-performance trade corridors for ambitious
                  global brands.
                </p>
                <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                  We combine market intelligence, vetted supplier networks,
                  compliance-first execution, and precision logistics to
                  deliver predictable outcomes in complex international
                  markets.
                </p>
                <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                  From sourcing strategy to final-mile delivery, our team
                  works as a long-term growth partner for companies that
                  demand speed, reliability, and enterprise-grade
                  professionalism in every shipment.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80"
                  alt="Business handshake"
                  className="h-[320px] sm:h-[380px] w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="py-16 sm:py-20 bg-transparent"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Our Services
            </h2>
            <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-300">
              A complete trade stack — built for speed, compliance, and predictable delivery.
            </p>
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Import Services",
                  desc: "Secure sourcing and compliant import operations tailored to your supply chain and timelines.",
                  icon: "import" as const,
                  tone:
                    "from-sky-100 to-cyan-100 text-sky-900 dark:from-sky-500/15 dark:to-cyan-500/15 dark:text-sky-200",
                  ring: "hover:border-sky-300/70 dark:hover:border-sky-500/50",
                },
                {
                  title: "Export Services",
                  desc: "Reliable export planning, documentation, and freight coordination for seamless market access.",
                  icon: "export" as const,
                  tone:
                    "from-emerald-100 to-teal-100 text-emerald-900 dark:from-emerald-500/15 dark:to-teal-500/15 dark:text-emerald-200",
                  ring:
                    "hover:border-emerald-300/70 dark:hover:border-emerald-500/50",
                },
                {
                  title: "Global Logistics & Shipping",
                  desc: "Multi-route logistics network with transparent movement tracking and milestone visibility.",
                  icon: "ship" as const,
                  tone:
                    "from-violet-100 to-fuchsia-100 text-violet-900 dark:from-violet-500/15 dark:to-fuchsia-500/15 dark:text-violet-200",
                  ring:
                    "hover:border-violet-300/70 dark:hover:border-violet-500/50",
                },
                {
                  title: "International Trade Consulting",
                  desc: "Practical guidance on market entry, compliance strategy, risk controls, and partner validation.",
                  icon: "consult" as const,
                  tone:
                    "from-amber-100 to-orange-100 text-amber-900 dark:from-amber-500/15 dark:to-orange-500/15 dark:text-amber-200",
                  ring:
                    "hover:border-amber-300/70 dark:hover:border-amber-500/50",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className={`group rounded-2xl border border-slate-200/70 bg-white/80 p-8 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_50px_-28px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900/70 ${s.ring}`}
                >
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/5 bg-gradient-to-br shadow-sm dark:border-white/10 ${s.tone}`}
                  >
                    <Icon name={s.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-slate-50">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Learn more <span aria-hidden>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section
          id="industries"
          className="py-16 sm:py-20 bg-transparent"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Industries We Serve
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  label: "Agriculture Products",
                  icon: "leaf" as const,
                  tone:
                    "from-emerald-100 to-lime-100 text-emerald-950 dark:from-emerald-500/15 dark:to-lime-500/15 dark:text-emerald-200",
                },
                {
                  label: "Textiles",
                  icon: "fabric" as const,
                  tone:
                    "from-rose-100 to-pink-100 text-rose-950 dark:from-rose-500/15 dark:to-pink-500/15 dark:text-rose-200",
                },
                {
                  label: "Industrial Goods",
                  icon: "factory" as const,
                  tone:
                    "from-sky-100 to-cyan-100 text-sky-950 dark:from-sky-500/15 dark:to-cyan-500/15 dark:text-sky-200",
                },
                {
                  label: "Machinery",
                  icon: "cog" as const,
                  tone:
                    "from-violet-100 to-indigo-100 text-violet-950 dark:from-violet-500/15 dark:to-indigo-500/15 dark:text-violet-200",
                },
                {
                  label: "Consumer Products",
                  icon: "bag" as const,
                  tone:
                    "from-amber-100 to-orange-100 text-amber-950 dark:from-amber-500/15 dark:to-orange-500/15 dark:text-amber-200",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`group rounded-2xl border border-slate-200/70 bg-gradient-to-br px-6 py-5 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-0.5 dark:border-slate-800 ${item.tone}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </div>
                    <div className="font-semibold">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why / Network */}
        <section id="network" className="py-16 sm:py-20 bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Global Network Built for Scale
            </h2>
            <p className="mt-4 max-w-3xl text-slate-200/90 leading-relaxed">
              We collaborate with trusted freight, customs, and sourcing partners
              across multiple countries, enabling efficient movement from origin
              to destination.
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {[
                { k: "25+", v: "Countries Connected" },
                { k: "400+", v: "Successful Shipments" },
                { k: "98%", v: "On-Time Documentation" },
              ].map((stat) => (
                <div
                  key={stat.v}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="text-2xl font-semibold text-amber-300">
                    {stat.k}
                  </div>
                  <div className="mt-2 text-slate-200/90">{stat.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-4 shadow-[0_25px_60px_-40px_rgba(0,0,0,0.8)]">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=2000&q=80"
                alt="Global network map"
                className="h-[320px] sm:h-[420px] w-full rounded-lg object-cover opacity-90"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="py-16 sm:py-20 bg-transparent"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Trusted by International Clients
            </h2>
            <div className="mt-10 space-y-6">
              {[
                {
                  name: "Markus Klein",
                  role: "Procurement Director, Germany",
                  quote:
                    "Findiy transformed our export cycle with precise documentation and exceptional communication across borders.",
                  accent: "border-l-sky-400",
                  avatar: "from-sky-200 to-cyan-300",
                },
                {
                  name: "Aisha Rahman",
                  role: "Operations Head, UAE",
                  quote:
                    "Their logistics team delivered consistency and confidence for every shipment into Southeast Asian markets.",
                  accent: "border-l-emerald-400",
                  avatar: "from-emerald-200 to-teal-300",
                },
                {
                  name: "Daniel Ortega",
                  role: "CEO, Mexico",
                  quote:
                    "From supplier alignment to customs handling, Findiy gives us a dependable global trade partner.",
                  accent: "border-l-amber-400",
                  avatar: "from-amber-200 to-orange-300",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className={`rounded-2xl border border-slate-200/70 border-l-4 bg-white/85 p-8 shadow-[0_22px_44px_-34px_rgba(15,23,42,0.5)] dark:border-slate-800 dark:bg-slate-900/75 ${t.accent}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 rounded-full bg-gradient-to-br ${t.avatar}`}
                    />
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <Icon name="shield" className="h-4 w-4" />
                        Verified client feedback
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        “{t.quote}”
                      </p>
                      <div className="mt-3 font-semibold text-slate-900 dark:text-slate-50">
                        {t.name}
                      </div>
                      <div className="text-sm text-slate-600">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Let&apos;s Start Your Global Trade Journey
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300">
              Share your requirements and our team will get back with a practical
              trade roadmap.
            </p>

            <div className="mt-6 text-slate-800 dark:text-slate-200 space-y-2">
              <div>
                <span className="font-semibold">Email:</span>{" "}
                <a className="underline" href="mailto:info@findiy.com">
                  info@findiy.com
                </a>
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                <a className="underline" href="tel:8855661100">
                  8855661100
                </a>
              </div>
              <div>
                <span className="font-semibold">Location:</span> Bengaluru,
                Karnataka, India
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Bengaluru (ICD) - Devanahalli Logistics Hub
                  <br />
                  Near Devanahalli Railway Goods Yard, Devanahalli 562110,
                  Karnataka, India
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/75">
              <div className="mb-6 flex items-center justify-between gap-3 border-b border-slate-200/80 pb-5 dark:border-slate-800/80">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                    Inquiry Form
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Tell us what you need — we typically respond within 24 hours.
                  </p>
                </div>
                <div className="hidden items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 sm:inline-flex dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                  <Icon name="globe" className="h-4 w-4" />
                  Priority support
                </div>
              </div>

              <form className="grid gap-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Full Name <span className="text-amber-600">*</span>
                    </label>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-300 focus:ring-4 focus:ring-amber-100 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-50 dark:focus:border-amber-400 dark:focus:ring-amber-400/20"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Email <span className="text-amber-600">*</span>
                    </label>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-300 focus:ring-4 focus:ring-amber-100 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-50 dark:focus:border-amber-400 dark:focus:ring-amber-400/20"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Contact Number <span className="text-amber-600">*</span>
                    </label>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-300 focus:ring-4 focus:ring-amber-100 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-50 dark:focus:border-amber-400 dark:focus:ring-amber-400/20"
                      type="tel"
                      placeholder="8855661100"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Company
                    </label>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-300 focus:ring-4 focus:ring-amber-100 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-50 dark:focus:border-amber-400 dark:focus:ring-amber-400/20"
                      placeholder="Your company name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Trade Requirement
                  </label>
                  <textarea
                    className="min-h-32 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-300 focus:ring-4 focus:ring-amber-100 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-50 dark:focus:border-amber-400 dark:focus:ring-amber-400/20"
                    placeholder="Product, quantity, target market, timeline, compliance needs..."
                    value={tradeRequirement}
                    onChange={(e) => setTradeRequirement(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3.5 font-semibold text-white shadow-md shadow-amber-200/60 transition-all hover:-translate-y-0.5 hover:from-amber-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-amber-900/20"
                >
                  {submitting ? "Sending..." : "Send Inquiry"}
                  <span aria-hidden>↗</span>
                </button>

                <div className="flex flex-col gap-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    We only use your details to respond to this inquiry.
                  </p>
                  {message && (
                    <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                      {message}
                    </p>
                  )}
                  {error && (
                    <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
                      {error}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="text-2xl font-semibold">Findiy</div>
              <p className="mt-4 text-slate-200/90">
                Trusted Import &amp; Export solutions for resilient international
                growth.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold text-amber-300">
                Quick Links
              </div>
              <ul className="mt-4 space-y-2 text-slate-200/90">
                <li>
                  <a href="#about" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#industries" className="hover:text-white">
                    Industries
                  </a>
                </li>
                <li>
                  <a href="#network" className="hover:text-white">
                    Network
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-white">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-amber-300">Services</div>
              <p className="mt-4 text-slate-200/90">
                Import • Export • Logistics • Consulting
              </p>
              <div className="mt-6 flex items-center gap-3">
                {["in", "ig", "fb"].map((x) => (
                  <a
                    key={x}
                    href="#"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 hover:bg-white/10 transition-colors"
                    aria-label="Social"
                  >
                    {x.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/15 pt-8 text-sm text-slate-200/80 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} Findiy. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span>8855661100</span>
              <span>Founder: John Colombe</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
