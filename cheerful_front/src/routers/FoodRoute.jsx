import { Route, Routes } from "react-router-dom";
import Food from "../pages/Food/Food/Food";
import FoodDetail from "../pages/Food/FoodDetail/FoodDetail";

function FoodRoute(props) {
  return (
    <Routes>
      <Route pate="/" element={<Food />} />
      <Route pate="/:foodId" element={<FoodDetail />} />
    </Routes>
  );
}

export default FoodRoute;
