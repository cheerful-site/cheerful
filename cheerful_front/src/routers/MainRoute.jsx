import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import Header from "../components/Header/Header";
import Auth from "../pages/Auth/Auth/Auth";
import Search from "../pages/Search/Search";
import Home from "../pages/Home/Home";
import Community from "../pages/Community/Community";
import Food from "../pages/Food/Food";
import MapPage from "../pages/Map/MapPage";
import Notice from "../pages/Notice/Notice";
import CommunityRegister from "../pages/CommunityRegister/CommunityRegister";
import Admin from "../pages/Admin/Admin/Admin";

function MainRoute(props) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      {location.pathname.startsWith("/admin") ? <></> : <Header />}
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/search" element={<Search />} />
        <Route path="/community/:category" element={<Community />} />
        <Route path="/community/register" element={<CommunityRegister />} />
        <Route path="/food" element={<Food />} />
        <Route path="/map/:category" element={<MapPage />} />
        <Route path="/notice/:category" element={<Notice />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MainRoute;
