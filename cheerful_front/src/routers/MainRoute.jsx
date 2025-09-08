import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import Header from "../components/Header/Header";
import Auth from "../pages/Auth/Auth/Auth";
import Home from "../pages/Home/Home";
import MapPage from "../pages/Map/MapPage";
import CommunityRegister from "../pages/Communities/CommunityRegister/CommunityRegister";
import AdminRoute from "./AdminRoute";
import CommunityRoute from "./CommunityRoute";
import NoticeRoute from "./NoticeRoute";
import FoodRoute from "./FoodRoute";
import SearchRoute from "./SearchRoute";
import ScrollTop from "../components/ScrollTop/ScrollTop";
import MyPage from "../pages/MyPage/MyPage";
import usePrincipalQuery from "../queries/PrincipalQuery/usePrincipalQuery";

function MainRoute(props) {
  const principal = usePrincipalQuery();
  const location = useLocation();
  const user = principal?.data?.data?.body?.user;
  // console.log(user);

  return (
    <>
      {location.pathname.startsWith("/admin") ? <></> : <Header />}
      <ScrollTop />
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/search/*" element={<SearchRoute />} />
        <Route path="/community/:category/*" element={<CommunityRoute />} />
        <Route path="/community/register" element={<CommunityRegister />} />
        <Route path="/food/*" element={<FoodRoute />} />
        <Route path="/notice/:category/*" element={<NoticeRoute />} />
        <Route path="/map/:category" element={<MapPage />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MainRoute;
