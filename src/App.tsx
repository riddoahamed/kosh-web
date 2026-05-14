import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InstallBanner } from "@/components/shared/InstallBanner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import KoshAssistant from "@/components/KoshAssistant";

const Landing = lazy(() => import("@/pages/Landing"));
const Diagnostic = lazy(() => import("@/pages/Diagnostic"));
const AgeSelection = lazy(() => import("@/pages/AgeSelection"));
const Results = lazy(() => import("@/pages/Results"));
const Auth = lazy(() => import("@/pages/Auth"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Module = lazy(() => import("@/pages/Module"));
const SkipQuiz = lazy(() => import("@/pages/SkipQuiz"));
const Challenge = lazy(() => import("@/pages/Challenge"));
const ComprehensiveExam = lazy(() => import("@/pages/ComprehensiveExam"));
const ScamSpotter = lazy(() => import("@/pages/ScamSpotter"));
const Comparator = lazy(() => import("@/pages/Comparator"));
const FDRCalculator = lazy(() => import("@/pages/FDRCalculator"));
const SavingsGoal = lazy(() => import("@/pages/SavingsGoal"));
const EMICalculator = lazy(() => import("@/pages/EMICalculator"));
const BudgetPlanner = lazy(() => import("@/pages/BudgetPlanner"));
const SIPCalculator = lazy(() => import("@/pages/SIPCalculator"));
const CarCalculator = lazy(() => import("@/pages/CarCalculator"));
const PortfolioBuilder = lazy(() => import("@/pages/PortfolioBuilder"));
const ZoneLibrary = lazy(() => import("@/pages/ZoneLibrary"));
const ZoneDetail = lazy(() => import("@/pages/ZoneDetail"));
const MangoStore = lazy(() => import("@/pages/MangoStore"));
const Profile = lazy(() => import("@/pages/Profile"));
const Welcome = lazy(() => import("@/pages/Welcome"));
const About = lazy(() => import("@/pages/About"));
const ForInstitutions = lazy(() => import("@/pages/ForInstitutions"));
const DevLogin = lazy(() => import("@/pages/DevLogin"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Explainers = lazy(() => import("@/pages/explainers/Explainers"));
const ExplainerCategory = lazy(() => import("@/pages/explainers/ExplainerCategory"));
const ExplainerDetail = lazy(() => import("@/pages/explainers/ExplainerDetail"));
const WorkerWise = lazy(() => import("@/pages/explainers/WorkerWise"));

function RouteFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div
        className="h-9 w-9 rounded-full border-2 border-primary/25 border-t-primary animate-spin"
        aria-label="Loading"
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <InstallBanner />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/age-select" element={<AgeSelection />} />
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
          <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
          <Route path="/zones" element={<ZoneLibrary />} />
          <Route path="/zones/:zoneId" element={<ZoneDetail />} />
          <Route path="/store" element={<MangoStore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/for-institutions" element={<ForInstitutions />} />
          <Route path="/explainers" element={<Explainers />} />
          <Route path="/explainers/:category" element={<ExplainerCategory />} />
          <Route path="/explainers/:category/:slug" element={<ExplainerDetail />} />
          <Route path="/worker-wise" element={<WorkerWise />} />
          <Route path="/x" element={<DevLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <KoshAssistant />
    </BrowserRouter>
    </ErrorBoundary>
  );
}
