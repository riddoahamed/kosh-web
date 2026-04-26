import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InstallBanner } from "@/components/shared/InstallBanner";
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
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
