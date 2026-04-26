import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { db } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(11, "Enter a valid BD phone number")
    .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi mobile number (01XXXXXXXXX)"),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
  location: z.string().min(1, "Please select your location"),
  referralCode: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "You must agree to continue",
  }),
});

type SignupForm = z.infer<typeof signupSchema>;

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent";

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setProfile } = useAuthStore();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      referralCode: searchParams.get("ref") ?? "",
      gender: "prefer_not_to_say",
    },
  });

  const savedResult = db.getDiagnosticResult();

  const onSubmit = (data: SignupForm) => {
    const profile = {
      id: crypto.randomUUID(),
      name: data.name,
      phone: data.phone,
      gender: data.gender,
      location: data.location,
      consent_given: data.consent,
      referral_code: data.referralCode,
      level_assigned: savedResult?.level,
      grey_zone_flagged: savedResult?.greyZone.flagged,
      grey_zone_exposure: savedResult?.greyZone.exposures,
      created_at: new Date().toISOString(),
    };
    setProfile(profile);
    setSuccess(true);
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Welcome to Kosh!</h2>
          <p className="text-muted-foreground">Setting up your track...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="Kosh" className="h-10 w-auto mx-auto" />
          </Link>
          <h1 className="text-xl font-semibold text-foreground">
            Create your free account
          </h1>
          <p className="text-muted-foreground text-sm">
            Save your result and start your learning track
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80">Your name</label>
              <input {...register("name")} placeholder="e.g. Rahela Akter" className={inputClass} />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80">Mobile number</label>
              <input {...register("phone")} placeholder="01XXXXXXXXX" type="tel" className={inputClass} />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80">Gender (optional)</label>
              <select {...register("gender")} className={inputClass}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80">Location</label>
              <select {...register("location")} className={inputClass}>
                <option value="">Select your location</option>
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
                <option value="sylhet">Sylhet</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="khulna">Khulna</option>
                <option value="barisal">Barisal</option>
                <option value="rangpur">Rangpur</option>
                <option value="mymensingh">Mymensingh</option>
                <option value="other">Other</option>
              </select>
              {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80">
                Referral code <span className="text-foreground/40 font-normal">(optional)</span>
              </label>
              <input {...register("referralCode")} placeholder="e.g. abc12345" className={inputClass} />
            </div>

            <div className="space-y-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("consent")}
                  className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary/40"
                />
                <span className="text-sm text-foreground/60 leading-relaxed">
                  I agree that Kosh may collect my learning data to measure outcomes and improve
                  the product. No financial products are sold. No data is sold to third parties.
                </span>
              </label>
              {errors.consent && <p className="text-xs text-destructive">{errors.consent.message}</p>}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account — it's free"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-foreground/30">
          No products. No commissions. No hidden agenda.
        </p>
      </div>
    </div>
  );
}
