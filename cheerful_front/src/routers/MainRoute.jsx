import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Header from "../components/Header/Header";
import Login from "../pages/Login/Login";

function MainRoute(props) {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
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
