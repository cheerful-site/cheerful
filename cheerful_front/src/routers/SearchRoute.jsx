import React from "react";
import { Route, Routes } from "react-router-dom";
import Search from "../pages/Search/Search";

function SearchRoute(props) {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/:searchword" element={<Search />} />
    </Routes>
  );
}

export default SearchRoute;
