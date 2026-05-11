import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useAuthStore } from './store/authStore.ts'
import { useUIStore } from './store/uiStore.ts'

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then((registrations) => registrations.forEach((registration) => registration.unregister()))
    .catch(() => {});
  if ('caches' in window) {
    caches.keys()
      .then((keys) => keys.forEach((key) => caches.delete(key)))
      .catch(() => {});
  }
}

// Apply saved theme before React renders (prevents flash)
useUIStore.getState().loadUI();

// Start Supabase auth listener before React renders
useAuthStore.getState().initAuth();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
