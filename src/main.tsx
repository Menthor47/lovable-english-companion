import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import './i18n';
import './sentry';
import { initAnalytics } from "@/lib/analytics";

// Initialize Analytics
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
