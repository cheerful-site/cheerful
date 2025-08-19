import React from "react";
import { Route, Routes } from "react-router-dom";
import Food from "../pages/Food/Food/Food";

function FoodRoute(props) {
  return (
    <Routes>
      <Route path="/" element={<Food />} />
      <Route path="/:foodId" element={<Food />} />
    </Routes>
  );
}

export default FoodRoute;
