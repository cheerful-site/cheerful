import { Route, Routes } from "react-router-dom";
import Search from "../pages/Search/Search";
import NotFound from "../pages/NotFound/NotFound";

function SearchRoute(props) {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/:searchword" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default SearchRoute;
