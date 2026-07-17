import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { SubscriptionsProvider } from "./context/SubscriptionsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SubscriptionsProvider>
        <App />
      </SubscriptionsProvider>
    </BrowserRouter>
  </StrictMode>,
);
