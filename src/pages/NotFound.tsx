import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <div className="text-6xl font-bold text-primary-600">404</div>
        <h2 className="text-xl font-semibold text-slate-800">
          Page not found
        </h2>
        <p className="text-slate-500">
          This page doesn't exist — but your money track does.
        </p>
        <Button asChild>
          <Link to="/">Back to Kosh</Link>
        </Button>
      </div>
    </div>
  );
}
