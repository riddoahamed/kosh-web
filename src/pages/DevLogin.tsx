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

const DEV_KEY = import.meta.env.VITE_DEV_LOGIN_KEY as string | undefined;

export default function DevLogin() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const k = params.get("k");
    if (DEV_KEY && k === DEV_KEY) {
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
