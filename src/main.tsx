/**
 * @fileoverview Vite/React entry point. Mounts the app tree into `#root`
 * and is the one-time mount point for `SubscriptionsProvider` (the
 * localStorage-backed subscription context from
 * `src/context/SubscriptionsContext.tsx`), so subscription state is
 * available to every page/component without prop-drilling.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { SubscriptionsProvider } from "./context/SubscriptionsContext.tsx";

// Non-null assertion: assumes index.html always has a #root element, per
// the standard Vite template contract.
//
// Nesting order (BrowserRouter outside, SubscriptionsProvider inside):
// neither depends on the other's state (routing doesn't read subscription
// data, and subscription state doesn't read the route), so this order
// isn't load-bearing for correctness — it's just the order they happened
// to be composed in.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SubscriptionsProvider>
        <App />
      </SubscriptionsProvider>
    </BrowserRouter>
  </StrictMode>,
);
