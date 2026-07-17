import { Outlet, useMatch } from "react-router-dom";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

export function AppLayout() {
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
