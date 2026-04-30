import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useProgressStore, CORE_MODULES } from "@/store/progressStore";
import { usePointsStore } from "@/store/pointsStore";
import type { KoshProfile } from "@/lib/supabase";
import { CheckCircle2, ChevronDown, LogOut, ShieldCheck, User } from "lucide-react";

const DIVISIONS = [
  "Dhaka", "Chittagong", "Rajshahi", "Khulna",
  "Barisal", "Sylhet", "Rangpur", "Mymensingh",
];

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all";

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
      <label className="text-xs font-semibold text-foreground/50">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={selectClass}
        >
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

export default function Profile() {
  const navigate = useNavigate();
  const { profile, setProfile, logout } = useAuthStore();
  const { progress, load } = useProgressStore();
  const { total: mangoes, streak, load: loadPoints } = usePointsStore();

  const [saved, setSaved] = useState(false);
  const [kycSaved, setKycSaved] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  // Profile fields
  const [name, setName] = useState(profile?.name ?? "");
  const [age, setAge] = useState(String(profile?.age ?? ""));
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [institution, setInstitution] = useState(profile?.institution ?? "");
  const [institutionType, setInstitutionType] = useState(profile?.institution_type ?? "");
  const [occupation, setOccupation] = useState(profile?.occupation ?? "");
  const [division, setDivision] = useState(profile?.division ?? "");
  const [district, setDistrict] = useState(profile?.district ?? "");

  // KYC fields
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-8 pb-24 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            ← Dashboard
          </button>
          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground/40 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>

        {/* Avatar + stats */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/15 flex items-center justify-center text-xl font-bold text-primary shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-foreground text-base leading-tight truncate">{profile.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{profile.email}</p>
              {profile.institution && (
                <p className="text-xs text-primary/70 font-medium mt-0.5 truncate">🏫 {profile.institution}</p>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Mangoes", value: `${mangoes.toLocaleString()} 🥭` },
              { label: "Streak", value: `${streak}d 🔥` },
              { label: "Modules", value: allCompleted },
              { label: "Time", value: `${totalTimeMin}m` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-muted/40 rounded-xl p-2.5 text-center">
                <p className="text-sm font-bold text-foreground">{value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Track progress */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Zone 1 progress</span>
              <span className="font-semibold text-foreground">{completedModules}/8 modules</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(completedModules / 8) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Edit Profile ── */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-foreground/40" />
            <h2 className="font-semibold text-foreground">Profile info</h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/50">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/50">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="24"
                  min={13}
                  max={100}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/50">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/50">
                Short bio <span className="text-muted-foreground/40 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="e.g. Finance student at BUET"
                maxLength={80}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* ── Leaderboard / Community info ── */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div>
            <h2 className="font-semibold text-foreground">Leaderboard info</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Used to match you with your institution and region on leaderboards. Not shown publicly without your consent.
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/50">Institution</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. BUET, Dhaka University, bKash Ltd."
                className={inputClass}
              />
            </div>

            <SelectField
              label="Institution type"
              value={institutionType}
              onChange={setInstitutionType}
              placeholder="Select type"
              options={[
                { value: "university", label: "University" },
                { value: "college", label: "College" },
                { value: "school", label: "School" },
                { value: "company", label: "Company / Organisation" },
                { value: "other", label: "Other" },
              ]}
            />

            <SelectField
              label="Occupation"
              value={occupation}
              onChange={setOccupation}
              placeholder="Select occupation"
              options={[
                { value: "student", label: "Student" },
                { value: "professional", label: "Working professional" },
                { value: "business_owner", label: "Business owner" },
                { value: "freelancer", label: "Freelancer" },
                { value: "other", label: "Other" },
              ]}
            />

            <SelectField
              label="Division"
              value={division}
              onChange={setDivision}
              placeholder="Select division"
              options={DIVISIONS.map((d) => ({ value: d, label: d }))}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/50">
                District <span className="text-muted-foreground/40 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Gazipur"
                className={inputClass}
              />
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            className="w-full bg-primary text-white rounded-xl py-3 font-semibold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Saved!
              </>
            ) : (
              "Save changes"
            )}
          </button>
        </div>

        {/* ── KYC Section ── */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-foreground/40" />
              <h2 className="font-semibold text-foreground">Identity verification (KYC)</h2>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              kycStatus === "verified"
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : kycStatus === "pending"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : kycStatus === "rejected"
                ? "bg-red-500/10 text-red-600 dark:text-red-400"
                : "bg-muted text-muted-foreground"
            }`}>
              {kycStatus === "verified" ? "✓ Verified" :
               kycStatus === "pending" ? "Pending review" :
               kycStatus === "rejected" ? "Rejected" :
               "Not submitted"}
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Required to redeem mangoes for Taka. We only store the last 4 digits of your NID — never the full number. Verification is reviewed manually within 3–5 working days.
          </p>

          {kycStatus === "verified" ? (
            <div className="bg-green-500/10 border border-green-500/25 rounded-xl p-4 text-center">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">✓ Your identity has been verified</p>
              <p className="text-xs text-muted-foreground mt-1">You can redeem mangoes from the Store page.</p>
            </div>
          ) : kycStatus === "pending" ? (
            <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 text-center">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Review in progress</p>
              <p className="text-xs text-muted-foreground mt-1">We'll notify you when verification is complete.</p>
            </div>
          ) : kycSaved ? (
            <div className="bg-green-500/10 border border-green-500/25 rounded-xl p-4 text-center">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">✓ Submitted — under review</p>
              <p className="text-xs text-muted-foreground mt-1">3–5 working days. We'll let you know.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/50">
                  Last 4 digits of NID
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  pattern="\d{4}"
                  value={nidLast4}
                  onChange={(e) => setNidLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="e.g. 7823"
                  className={inputClass}
                />
                <p className="text-[10px] text-muted-foreground/50">We never store your full NID number.</p>
              </div>

              <SelectField
                label="Division (for verification)"
                value={kycDivision}
                onChange={setKycDivision}
                placeholder="Select your division"
                options={DIVISIONS.map((d) => ({ value: d, label: d }))}
              />

              <button
                onClick={handleSubmitKyc}
                disabled={nidLast4.length !== 4 || !kycDivision}
                className="w-full bg-foreground text-background rounded-xl py-3 font-semibold text-sm hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Submit KYC
              </button>
            </div>
          )}
        </div>

        {/* ── Danger zone ── */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 space-y-3">
          <h2 className="font-semibold text-foreground text-sm">Sign out</h2>
          <p className="text-xs text-muted-foreground">
            Your progress is saved. Signing out removes this device's session — use your email to sign back in.
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
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 pb-8">
          <div className="w-full max-w-sm bg-background border border-border rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-foreground">Sign out?</h3>
            <p className="text-sm text-muted-foreground">
              Your progress and mangoes are saved. You can sign back in any time with your email.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 border border-border rounded-xl py-3 text-sm font-semibold text-foreground/60 hover:text-foreground transition-all"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await logout();
                  navigate("/", { replace: true });
                }}
                className="flex-1 bg-red-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-red-600 transition-all"
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
