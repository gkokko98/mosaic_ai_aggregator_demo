import { Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Home } from "@/pages/Home";
import { Explore } from "@/pages/Explore";
import { News } from "@/pages/News";
import { MyPlans } from "@/pages/MyPlans";
import { ServiceDetails } from "@/pages/ServiceDetails";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="news" element={<News />} />
        <Route path="my-plans" element={<MyPlans />} />
        <Route path="app/:id" element={<ServiceDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
