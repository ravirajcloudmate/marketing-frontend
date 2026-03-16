"use client";

import { FormEvent, useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("findiy-theme");
    const initial = stored === "dark" ? "dark" : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("findiy-theme", next);
    }
    document.documentElement.classList.toggle("dark", next === "dark");
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
      setCompany("");
      setTradeRequirement("");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <header className="fixed inset-x-0 top-0 z-50 bg-white/90 dark:bg-slate-950/80 backdrop-blur border-b border-slate-200/70 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="text-2xl font-semibold tracking-tight">Findiy</div>
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
                className="text-xs font-medium text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400"
                href="/admin"
              >
                Admin
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                className="md:hidden inline-flex items-center justify-center rounded-md border border-slate-200 px-3 py-2 text-sm"
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
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(2, 6, 23, 0.92), rgba(2, 6, 23, 0.35)), url(https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=2400&q=80)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <p className="text-xs tracking-[0.25em] text-amber-300/90 font-semibold">
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
                className="inline-flex items-center justify-center rounded-md bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700 transition-colors"
              >
                Get a Quote
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/15 transition-colors"
              >
                Contact Us
              </a>
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
                  Founded by <span className="font-semibold">Raviraj Jadav</span>
                  , Findiy is an import-export company focused on building
                  dependable cross-border trade channels for modern businesses.
                </p>
                <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                  Our mission is to simplify international trade with transparent
                  execution, rigorous quality standards, and long-term global
                  partnerships.
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
          className="py-16 sm:py-20 bg-white dark:bg-slate-950"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Our Services
            </h2>
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Import Services",
                  desc: "Secure sourcing and compliant import operations tailored to your supply chain and timelines.",
                },
                {
                  title: "Export Services",
                  desc: "Reliable export planning, documentation, and freight coordination for seamless market access.",
                },
                {
                  title: "Global Logistics & Shipping",
                  desc: "Multi-route logistics network with transparent movement tracking and milestone visibility.",
                },
                {
                  title: "International Trade Consulting",
                  desc: "Practical guidance on market entry, compliance strategy, risk controls, and partner validation.",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-8"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-amber-100 text-amber-800 font-semibold">
                    ✦
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-slate-50">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section
          id="industries"
          className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Industries We Serve
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Agriculture Products",
                "Textiles",
                "Industrial Goods",
                "Machinery",
                "Consumer Products",
              ].map((label) => (
                <div
                  key={label}
                  className="rounded-lg border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-5 text-slate-800 dark:text-slate-100 font-medium"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why / Network */}
        <section id="network" className="py-16 sm:py-20 bg-slate-900 text-white">
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
                  className="rounded-xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="text-2xl font-semibold text-amber-300">
                    {stat.k}
                  </div>
                  <div className="mt-2 text-slate-200/90">{stat.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-white/15 bg-white/5 p-4">
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
          className="py-16 sm:py-20 bg-white dark:bg-slate-950"
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
                },
                {
                  name: "Aisha Rahman",
                  role: "Operations Head, UAE",
                  quote:
                    "Their logistics team delivered consistency and confidence for every shipment into Southeast Asian markets.",
                },
                {
                  name: "Daniel Ortega",
                  role: "CEO, Mexico",
                  quote:
                    "From supplier alignment to customs handling, Findiy gives us a dependable global trade partner.",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-slate-200" />
                    <div>
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
                <a className="underline" href="tel:+919876543210">
                  +91 98765 43210
                </a>
              </div>
              <div>
                <span className="font-semibold">Location:</span> Ahmedabad,
                Gujarat, India
              </div>
            </div>

            <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8">
              <form className="grid gap-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-300"
                    placeholder=""
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-300"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Company
                  </label>
                  <input
                    className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-300"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Trade Requirement
                  </label>
                  <textarea
                    className="min-h-28 w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-300"
                    value={tradeRequirement}
                    onChange={(e) => setTradeRequirement(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700 transition-colors disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send Inquiry"}{" "}
                  <span aria-hidden>↗</span>
                </button>
                {message && (
                  <p className="text-sm text-emerald-600">{message}</p>
                )}
                {error && <p className="text-sm text-red-600">{error}</p>}
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
              <span>+91 98765 43210</span>
              <span>Founder: Raviraj Jadav</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
