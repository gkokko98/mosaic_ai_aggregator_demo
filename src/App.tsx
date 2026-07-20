/**
 * @fileoverview The app's route map. Every screen (Home, Explore, News,
 * NewsArticle, MyPlans, ServiceDetails) is registered here as a nested
 * `<Route>` under one shared `<AppLayout>` element, rather than each page
 * owning its own layout/shell.
 */

import { Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Home } from "@/pages/Home";
import { Explore } from "@/pages/Explore";
import { News } from "@/pages/News";
import { NewsArticle } from "@/pages/NewsArticle";
import { MyPlans } from "@/pages/MyPlans";
import { ServiceDetails } from "@/pages/ServiceDetails";

/**
 * Root component. All routes below nest under the single `<AppLayout>`
 * element, which supplies the shared header/bottom-nav chrome (and decides
 * when to hide the generic header for pages that render their own hero) —
 * so adding a new page here means adding one more nested `<Route>` under
 * that existing layout, not standing up a whole new layout tree.
 */
function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsArticle />} />
        <Route path="my-plans" element={<MyPlans />} />
        <Route path="app/:id" element={<ServiceDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
