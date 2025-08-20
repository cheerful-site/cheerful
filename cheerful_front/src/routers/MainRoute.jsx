import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import Header from "../components/Header/Header";
import Auth from "../pages/Auth/Auth/Auth";
import Search from "../pages/Search/Search";
import Home from "../pages/Home/Home";
import MapPage from "../pages/Map/MapPage";
import CommunityRegister from "../pages/Communities/CommunityRegister/CommunityRegister";
import AdminRoute from "./AdminRoute";
import CommunityRoute from "./CommunityRoute";
import NoticeRoute from "./NoticeRoute";
import Food from "../pages/Food/Food/Food";
import FoodDetail from "../pages/Food/FoodDetail/FoodDetail";
import FoodRoute from "./FoodRoute";

function MainRoute(props) {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith("/admin") ? <></> : <Header />}
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/search" element={<Search />} />
        <Route path="/community/:category/*" element={<CommunityRoute />} />
        <Route path="/community/register" element={<CommunityRegister />} />
        <Route path="/food/*" element={<Food />} />
        <Route path="/notice/:category/*" element={<NoticeRoute />} />
        <Route path="/map/:category" element={<MapPage />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MainRoute;
