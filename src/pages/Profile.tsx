import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useProgressStore, CORE_MODULES } from "@/store/progressStore";
import { usePointsStore } from "@/store/pointsStore";
import { useUIStore, type Theme } from "@/store/uiStore";
import type { KoshProfile } from "@/lib/supabase";
import {
  CheckCircle2,
  ChevronDown,
  LogOut,
  Monitor,
  Moon,
  Settings,
  ShieldCheck,
  Sun,
  User,
  Flame,
  Zap,
  Clock,
  BookOpen,
} from "lucide-react";

const DIVISIONS = [
  "Dhaka", "Chittagong", "Rajshahi", "Khulna",
  "Barisal", "Sylhet", "Rangpur", "Mymensingh",
];

const GREEN = "160 90% 45%";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-muted/40 text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all";

const selectClass = inputClass + " appearance-none cursor-pointer";

function SelectField({
  label, value, onChange, options, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-foreground/45">{label}</label>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 space-y-4 ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2.5 pb-1">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: `hsla(${GREEN} / 0.12)`,
          border: `1px solid hsla(${GREEN} / 0.25)`,
        }}
      >
        <Icon size={14} style={{ color: `hsl(${GREEN})` }} strokeWidth={1.75} />
      </div>
      <h2 className="font-bold text-foreground text-sm">{title}</h2>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { profile, setProfile, logout } = useAuthStore();
  const { progress, load } = useProgressStore();
  const { total: mangoes, streak, load: loadPoints } = usePointsStore();
  const { theme, aiWidgetHidden, setTheme, setAIWidgetHidden } = useUIStore();

  const [saved, setSaved] = useState(false);
  const [kycSaved, setKycSaved] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [name, setName] = useState(profile?.name ?? "");
  const [age, setAge] = useState(String(profile?.age ?? ""));
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [institution, setInstitution] = useState(profile?.institution ?? "");
  const [institutionType, setInstitutionType] = useState(profile?.institution_type ?? "");
  const [occupation, setOccupation] = useState(profile?.occupation ?? "");
  const [division, setDivision] = useState(profile?.division ?? "");
  const [district, setDistrict] = useState(profile?.district ?? "");

  const [nidLast4, setNidLast4] = useState(profile?.nid_last4 ?? "");
  const [kycDivision, setKycDivision] = useState(profile?.division ?? "");

  useEffect(() => {
    if (!profile) navigate("/auth", { replace: true });
    load();
    loadPoints();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!profile) return null;

  const completedModules = CORE_MODULES.filter(
    (id) => progress[id]?.status === "completed"
  ).length;

  const totalTimeMin = Math.round(
    Object.values(progress).reduce((acc, r) => acc + (r.timeSpentSeconds ?? 0), 0) / 60
  );

  const allCompleted = Object.values(progress).filter(
    (r) => r.status === "completed"
  ).length;

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  function handleSaveProfile() {
    if (!profile) return;
    const updated: KoshProfile = {
      ...profile,
      name: name.trim() || profile.name,
      age: age ? parseInt(age) : profile.age,
      phone: phone.trim() || undefined,
      bio: bio.trim() || undefined,
      institution: institution.trim() || undefined,
      institution_type: (institutionType as KoshProfile["institution_type"]) || undefined,
      occupation: (occupation as KoshProfile["occupation"]) || undefined,
      division: division || undefined,
      district: district.trim() || undefined,
    };
    setProfile(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleSubmitKyc() {
    if (!profile || nidLast4.length !== 4) return;
    const updated: KoshProfile = {
      ...profile,
      nid_last4: nidLast4,
      division: kycDivision || profile.division,
      kyc_submitted: true,
      kyc_status: "pending",
      kyc_submitted_at: new Date().toISOString(),
    };
    setProfile(updated);
    setKycSaved(true);
  }

  const kycStatus = profile.kyc_status ?? "not_submitted";
  const trackPct = Math.round((completedModules / 8) * 100);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-8 pb-24 space-y-5">

        {/* Top nav */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-foreground/50 hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Dashboard
          </button>
          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground/35 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>

        {/* ── Hero card ── */}
        <div
          className="rounded-2xl p-5 space-y-4 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, hsla(${GREEN} / 0.10) 0%, hsla(0 0% 0% / 0.0) 60%)`,
            border: `1px solid hsla(${GREEN} / 0.22)`,
          }}
        >
          {/* Subtle glow blob */}
          <div
            className="absolute -top-8 -left-8 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: `hsla(${GREEN} / 0.08)`, filter: "blur(32px)" }}
          />

          <div className="relative flex items-center gap-4">
            {/* Avatar */}
            <div
              className="h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-black shrink-0"
              style={{
                background: `hsla(${GREEN} / 0.15)`,
                border: `1.5px solid hsla(${GREEN} / 0.35)`,
                color: `hsl(${GREEN})`,
                boxShadow: `0 0 24px hsla(${GREEN} / 0.25)`,
                textShadow: `0 0 12px hsla(${GREEN} / 0.7)`,
              }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-foreground text-lg leading-tight truncate">{profile.name}</p>
              <p className="text-xs text-foreground/45 mt-0.5 truncate">{profile.email}</p>
              {profile.institution && (
                <p
                  className="text-xs font-semibold mt-0.5 truncate"
                  style={{ color: `hsl(${GREEN})` }}
                >
                  {profile.institution}
                </p>
              )}
              {profile.bio && (
                <p className="text-xs text-foreground/50 mt-0.5 italic truncate">"{profile.bio}"</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="relative grid grid-cols-4 gap-2">
            {[
              { icon: Zap, value: `${mangoes.toLocaleString()}`, label: "Mangoes", emoji: "🥭" },
              { icon: Flame, value: `${streak}d`, label: "Streak", emoji: "🔥" },
              { icon: BookOpen, value: allCompleted, label: "Done", emoji: null },
              { icon: Clock, value: `${totalTimeMin}m`, label: "Time", emoji: null },
            ].map(({ value, label, emoji }) => (
              <div
                key={label}
                className="rounded-xl p-2.5 text-center"
                style={{ background: "hsla(0 0% 100% / 0.04)", border: "1px solid hsla(0 0% 100% / 0.07)" }}
              >
                <p className="text-sm font-black text-foreground">
                  {value}{emoji && <span className="ml-0.5 text-xs">{emoji}</span>}
                </p>
                <p className="text-[10px] text-foreground/40 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Zone 1 progress */}
          <div className="relative space-y-1.5">
            <div className="flex justify-between text-xs text-foreground/45">
              <span>Zone 1 progress</span>
              <span className="font-bold" style={{ color: `hsl(${GREEN})` }}>{completedModules}/8</span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${trackPct}%`,
                  background: `linear-gradient(90deg, hsl(${GREEN}), hsl(160 90% 55%))`,
                  boxShadow: `0 0 8px hsla(${GREEN} / 0.5)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Edit Profile ── */}
        <SectionCard>
          <SectionTitle icon={User} title="Profile info" />
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/45">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/45">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="24" min={13} max={100} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/45">Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01XXXXXXXXX" className={inputClass} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/45">
                Short bio <span className="text-foreground/30 font-normal">(optional)</span>
              </label>
              <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="e.g. Finance student at BUET" maxLength={80} className={inputClass} />
            </div>
          </div>
        </SectionCard>

        {/* ── Leaderboard ── */}
        <SectionCard>
          <div>
            <h2 className="font-bold text-foreground text-sm">Leaderboard info</h2>
            <p className="text-xs text-foreground/40 mt-0.5 leading-relaxed">
              Matches you with your institution and region. Not shown publicly without your consent.
            </p>
          </div>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/45">Institution</label>
              <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="e.g. BUET, Dhaka University, bKash Ltd." className={inputClass} />
            </div>
            <SelectField label="Institution type" value={institutionType} onChange={setInstitutionType} placeholder="Select type" options={[
              { value: "university", label: "University" },
              { value: "college", label: "College" },
              { value: "school", label: "School" },
              { value: "company", label: "Company / Organisation" },
              { value: "other", label: "Other" },
            ]} />
            <SelectField label="Occupation" value={occupation} onChange={setOccupation} placeholder="Select occupation" options={[
              { value: "student", label: "Student" },
              { value: "professional", label: "Working professional" },
              { value: "business_owner", label: "Business owner" },
              { value: "freelancer", label: "Freelancer" },
              { value: "other", label: "Other" },
            ]} />
            <SelectField label="Division" value={division} onChange={setDivision} placeholder="Select division" options={DIVISIONS.map((d) => ({ value: d, label: d }))} />
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/45">
                District <span className="text-foreground/30 font-normal">(optional)</span>
              </label>
              <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="e.g. Gazipur" className={inputClass} />
            </div>
          </div>
          <button
            onClick={handleSaveProfile}
            className="w-full rounded-xl py-3 font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            style={{
              background: `hsl(${GREEN})`,
              color: "#000",
              boxShadow: `0 0 20px hsla(${GREEN} / 0.35)`,
            }}
          >
            {saved ? (
              <><CheckCircle2 className="h-4 w-4" /> Saved!</>
            ) : (
              "Save changes"
            )}
          </button>
        </SectionCard>

        {/* ── KYC ── */}
        <SectionCard>
          <div className="flex items-center justify-between">
            <SectionTitle icon={ShieldCheck} title="Identity verification (KYC)" />
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              kycStatus === "verified"
                ? "bg-green-500/15 text-green-500"
                : kycStatus === "pending"
                ? "bg-amber-500/15 text-amber-500"
                : kycStatus === "rejected"
                ? "bg-red-500/15 text-red-400"
                : "bg-muted text-muted-foreground"
            }`}>
              {kycStatus === "verified" ? "✓ Verified" :
               kycStatus === "pending" ? "Pending" :
               kycStatus === "rejected" ? "Rejected" :
               "Not submitted"}
            </span>
          </div>
          <p className="text-xs text-foreground/40 leading-relaxed -mt-1">
            Required to redeem mangoes for Taka. We only store the last 4 digits of your NID.
          </p>
          {kycStatus === "verified" ? (
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4 text-center">
              <p className="text-sm font-bold text-green-500">✓ Identity verified</p>
              <p className="text-xs text-foreground/40 mt-1">Redeem mangoes from the Store page.</p>
            </div>
          ) : kycStatus === "pending" || kycSaved ? (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 text-center">
              <p className="text-sm font-bold text-amber-500">Review in progress</p>
              <p className="text-xs text-foreground/40 mt-1">3–5 working days. We'll let you know.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/45">Last 4 digits of NID</label>
                <input
                  type="text" inputMode="numeric" maxLength={4} pattern="\d{4}"
                  value={nidLast4}
                  onChange={(e) => setNidLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="e.g. 7823"
                  className={inputClass}
                />
                <p className="text-[10px] text-foreground/30">We never store your full NID number.</p>
              </div>
              <SelectField label="Division (for verification)" value={kycDivision} onChange={setKycDivision} placeholder="Select your division" options={DIVISIONS.map((d) => ({ value: d, label: d }))} />
              <button
                onClick={handleSubmitKyc}
                disabled={nidLast4.length !== 4 || !kycDivision}
                className="w-full bg-foreground text-background rounded-xl py-3 font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:opacity-90"
              >
                Submit KYC
              </button>
            </div>
          )}
        </SectionCard>

        {/* ── Settings ── */}
        <SectionCard>
          <SectionTitle icon={Settings} title="Settings" />

          {/* Theme picker */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-foreground/40">Theme</p>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: "system", label: "System", icon: Monitor },
                { value: "light",  label: "Light",  icon: Sun },
                { value: "dark",   label: "Dark",   icon: Moon },
              ] as { value: Theme; label: string; icon: React.ElementType }[]).map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className="flex flex-col items-center gap-1.5 rounded-xl border-2 py-3 px-2 text-xs font-semibold transition-all"
                  style={theme === value ? {
                    borderColor: `hsl(${GREEN})`,
                    background: `hsla(${GREEN} / 0.10)`,
                    color: `hsl(${GREEN})`,
                  } : {
                    borderColor: "hsl(var(--border))",
                    background: "transparent",
                    color: "hsl(var(--foreground) / 0.45)",
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Widget toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-base" style={{ filter: "drop-shadow(0 0 4px #a3e635)" }}>✨</span>
              <div>
                <p className="text-sm font-bold text-foreground">AI Assistant</p>
                <p className="text-xs text-foreground/40">Floating chat widget</p>
              </div>
            </div>
            <button
              onClick={() => setAIWidgetHidden(!aiWidgetHidden)}
              className="relative w-11 h-6 rounded-full transition-all"
              style={{ background: aiWidgetHidden ? "hsl(var(--muted))" : `hsl(${GREEN})` }}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
                  aiWidgetHidden ? "left-0.5" : "left-[22px]"
                }`}
              />
            </button>
          </div>
          {aiWidgetHidden && (
            <p className="text-xs text-foreground/35 -mt-2">
              Widget is hidden. Toggle to restore ✨.
            </p>
          )}
        </SectionCard>

        {/* ── Danger zone ── */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 space-y-3">
          <h2 className="font-bold text-foreground text-sm">Sign out</h2>
          <p className="text-xs text-foreground/40">
            Your progress is saved. Sign back in with your email any time.
          </p>
          <button
            onClick={() => setShowLogout(true)}
            className="text-sm font-semibold text-red-500 hover:text-red-400 transition-colors"
          >
            Sign out of Kosh →
          </button>
        </div>
      </div>

      {/* Logout confirm modal */}
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-8">
          <div
            className="w-full max-w-sm rounded-2xl p-6 space-y-4"
            style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
          >
            <h3 className="font-black text-foreground text-lg">Sign out?</h3>
            <p className="text-sm text-foreground/50">
              Your progress and mangoes are saved. Sign back in any time with your email.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 border border-border rounded-xl py-3 text-sm font-semibold text-foreground/50 hover:text-foreground transition-all"
              >
                Cancel
              </button>
              <button
                onClick={async () => { await logout(); navigate("/", { replace: true }); }}
                className="flex-1 bg-red-500 text-white rounded-xl py-3 text-sm font-bold hover:bg-red-600 transition-all"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
