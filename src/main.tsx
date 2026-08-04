import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "./i18n";
import { LocationProvider } from "./locations";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <LocationProvider>
        <App />
      </LocationProvider>
    </LanguageProvider>
  </StrictMode>
);
