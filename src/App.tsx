import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { InstallBanner } from "@/components/shared/InstallBanner";
import { useAuthStore } from "@/store/authStore";
import { auth, db } from "@/lib/supabase";
import Landing from "@/pages/Landing";
import Diagnostic from "@/pages/Diagnostic";
import Results from "@/pages/Results";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Module from "@/pages/Module";
import SkipQuiz from "@/pages/SkipQuiz";
import Challenge from "@/pages/Challenge";
import ComprehensiveExam from "@/pages/ComprehensiveExam";
import ScamSpotter from "@/pages/ScamSpotter";
import Comparator from "@/pages/Comparator";
import FDRCalculator from "@/pages/FDRCalculator";
import SavingsGoal from "@/pages/SavingsGoal";
import EMICalculator from "@/pages/EMICalculator";
import BudgetPlanner from "@/pages/BudgetPlanner";
import SIPCalculator from "@/pages/SIPCalculator";
import CarCalculator from "@/pages/CarCalculator";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

// Catches users who land anywhere after clicking the magic link email
// (session is in the URL hash — Supabase JS auto-exchanges it)
function MagicLinkHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setProfile } = useAuthStore();

  useEffect(() => {
    if (location.pathname === "/auth") return; // Auth page handles itself
    const hasHashSession =
      window.location.hash.includes("access_token") ||
      window.location.hash.includes("type=recovery");
    if (!hasHashSession) return;

    // Give Supabase JS a moment to exchange the hash for a session
    const timer = setTimeout(async () => {
      const session = await auth.getSession();
      if (!session?.user) return;
      const existing = await db.fetchProfile(session.user.id);
      if (existing) {
        setProfile(existing);
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/auth", { replace: true });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [location.pathname, navigate, setProfile]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <MagicLinkHandler />
      <InstallBanner />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/check" element={<Diagnostic />} />
        <Route path="/results" element={<Results />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/module/:id" element={<Module />} />
        <Route path="/quiz/:id" element={<SkipQuiz />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/exam" element={<ComprehensiveExam />} />
        <Route path="/scam-spotter" element={<ScamSpotter />} />
        <Route path="/comparator" element={<Comparator />} />
        <Route path="/fdr-calculator" element={<FDRCalculator />} />
        <Route path="/savings-goal" element={<SavingsGoal />} />
        <Route path="/emi-calculator" element={<EMICalculator />} />
        <Route path="/budget-planner" element={<BudgetPlanner />} />
        <Route path="/sip-calculator" element={<SIPCalculator />} />
        <Route path="/car-calculator" element={<CarCalculator />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
