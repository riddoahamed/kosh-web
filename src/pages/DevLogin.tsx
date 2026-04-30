/**
 * Private developer login — not linked anywhere in the UI.
 * Access: /x?k=<DEV_KEY>
 * Seeds localStorage via startDemo() and redirects to /dashboard.
 * Wrong key → silent redirect to /.
 */

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { startDemo } from "@/lib/demo";
import { useAuthStore } from "@/store/authStore";

// Change this to whatever secret you want — it never appears in the UI
const DEV_KEY = "kosh-dev-2026";

export default function DevLogin() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const k = params.get("k");
    if (k === DEV_KEY) {
      startDemo();
      useAuthStore.getState().loadProfile();
      navigate("/dashboard", { replace: true });
    } else {
      // Wrong or missing key — blend in with normal 404 behavior
      navigate("/", { replace: true });
    }
  }, [navigate, params]);

  return null;
}
