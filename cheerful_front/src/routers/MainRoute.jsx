import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Header from "../components/Header/Header";
import Auth from "../pages/Auth/Auth/Auth";
import Search from "../pages/Search/Search";

function MainRoute(props) {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/search" element={<Search />} />
        <Route path="/community" element={<></>} />
        <Route path="/food" element={<></>} />
        <Route path="/map" element={<></>} />
        <Route path="/notice" element={<></>} />
        <Route path="/admin/*" element={<></>} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MainRoute;
