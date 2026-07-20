import { Outlet, useMatch } from "react-router-dom";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

/**
 * Root shell rendered around every routed page via React Router's
 * `<Outlet>`. Constrains content to a centered mobile-width column (the
 * Figma designs are phone-width, so wider viewports don't get a distinct
 * desktop layout) and always mounts `BottomNav`.
 */
export function AppLayout() {
  // ServiceDetails (/app/:id) and NewsArticle (/news/:id) each render their
  // own hero image + back button in place of the generic header, so showing
  // Header on top of those would be redundant/conflicting.
  const isServiceDetails = useMatch("/app/:id");
  const isNewsArticle = useMatch("/news/:id");

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-app-bg">
      {!isServiceDetails && !isNewsArticle && <Header />}
      <main className="flex-1 overflow-y-auto px-4 pb-6">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
