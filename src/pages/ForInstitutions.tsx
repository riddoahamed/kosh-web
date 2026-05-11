import { useState } from "react";
import { Link } from "react-router-dom";

const PARTNERSHIP_MODELS = [
  {
    id: "white_label",
    title: "White-label embed",
    description:
      "Embed Kosh modules into your own app or website. Your customers learn financial concepts inside your platform with your branding. We handle the content, you keep the customer relationship.",
    bestFor: "Banks, MFS providers, e-commerce platforms with financial features.",
  },
  {
    id: "research",
    title: "Research and content partnership",
    description:
      "We produce research and educational content tailored to your customer base. Onboarding flows, product explainers, financial literacy modules customised for your audience.",
    bestFor:
      "Stock brokerages onboarding new retail investors, NBFIs explaining structured products, MFIs supporting borrower graduation.",
  },
  {
    id: "csr",
    title: "CSR and impact partnership",
    description:
      "Sponsor financial literacy outcomes for specific communities — university students, garment workers, women entrepreneurs. We deliver measurable impact: pre/post knowledge scores, behavior change indicators, completion rates.",
    bestFor: "Bank CSR teams, foundations, development partners.",
  },
];

const WHY_KOSH = [
  "Bangladesh-specific from the ground up — not adapted from US/UK/India content",
  "Behaviour-first methodology — research-backed approach to actually changing financial behaviour, not just teaching concepts",
  "Honest, vendor-neutral content — we don't sell anyone's products, which is why customers trust the recommendations",
  "Measurable outcomes — we track what users learn AND what they do",
  "Built for the actual user — Bangla concepts when needed, English where it's clearer, BDT amounts always",
];

const TRACK_RECORD = [
  "48 modules covering foundations to advanced investing and financial planning",
  "9 zones spanning savings products, debt, taxes, stocks, behavioural finance, mutual funds, real estate, and retirement",
  "7 calculators including SIP, EMI, FDR, Budget Planner, Comparator",
  "AI assistant trained for personal finance questions, scoped to refuse investment advice",
  "Portfolio builder simulator using BD instruments and BD market assumptions",
  "Diagnostic tool measuring financial knowledge, behaviour, and confidence",
];

interface InquiryForm {
  name: string;
  email: string;
  organization: string;
  role: string;
  model: string;
  message: string;
}

const INITIAL: InquiryForm = {
  name: "",
  email: "",
  organization: "",
  role: "",
  model: "white_label",
  message: "",
};

export default function ForInstitutions() {
  const [form, setForm] = useState<InquiryForm>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.organization.trim() || !form.message.trim()) return;
    const subject = encodeURIComponent(`Kosh pilot inquiry — ${form.organization.trim()}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
        `Organisation: ${form.organization.trim()}`,
        `Role: ${form.role.trim() || "Not specified"}`,
        `Interest: ${form.model}`,
        "",
        form.message.trim(),
      ].join("\n")
    );
    setSubmitted(true);
    window.location.href = `mailto:koshinitiative@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-10 pb-20 space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <Link
            to="/"
            className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            ← Back to Kosh
          </Link>
        </div>

        {/* Hero */}
        <section className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Bangladesh's first system for building financially literate customers.
          </h1>
          <p className="text-foreground/70 leading-relaxed">
            We've spent two years researching how Bangladeshis actually learn — and unlearn — money
            behaviours. Our 48-module curriculum, 7 calculators, AI assistant, and portfolio builder
            are built specifically for the Bangladesh context. Banks, brokerages, and financial
            institutions can partner with us to embed financial education into their products.
          </p>
        </section>

        {/* Three partnership models */}
        <section className="space-y-4">
          <p className="text-xs font-semibold text-foreground/35 uppercase tracking-widest">
            Three ways to partner
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {PARTNERSHIP_MODELS.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl border border-border bg-card p-5 space-y-3"
              >
                <h3 className="font-bold text-foreground text-base leading-tight">{m.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{m.description}</p>
                <p className="text-xs text-foreground/50 italic leading-relaxed">
                  Best for: {m.bestFor}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Kosh */}
        <section className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <p className="text-xs font-semibold text-foreground/35 uppercase tracking-widest">
            Why Kosh
          </p>
          <ul className="space-y-2.5">
            {WHY_KOSH.map((w, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/80">
                <span className="text-primary shrink-0">→</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Track record */}
        <section className="space-y-3">
          <p className="text-xs font-semibold text-foreground/35 uppercase tracking-widest">
            What we've built
          </p>
          <ul className="grid gap-2.5 md:grid-cols-2">
            {TRACK_RECORD.map((t, i) => (
              <li
                key={i}
                className="rounded-xl border border-border bg-card/50 px-4 py-3 text-sm text-foreground/75 leading-relaxed"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">Talk to us</h2>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Want to talk about how Kosh could work for your organisation? Send us a note below
              or email us directly. We respond within 48 hours.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-4">
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Your email app should open now.
              </p>
              <p className="text-xs text-foreground/60 mt-1 leading-relaxed">
                Send the prepared email to koshinitiative@gmail.com and we'll reply within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Organisation"
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <input
                  type="text"
                  placeholder="Role (optional)"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <select
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="white_label">I'm interested in: White-label embed</option>
                <option value="research">I'm interested in: Research and content partnership</option>
                <option value="csr">I'm interested in: CSR and impact partnership</option>
                <option value="other">I'm interested in: Something else / not sure yet</option>
              </select>
              <textarea
                required
                rows={4}
                placeholder="Tell us about your audience, goal, and rough timeline."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
              />
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground rounded-xl py-3 text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Send inquiry
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
