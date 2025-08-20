import { Route, Routes } from "react-router-dom";
import Food from "../pages/Food/Food/Food";
import FoodDetail from "../pages/Food/FoodDetail/FoodDetail";

function FoodRoute(props) {
  return (
    <Routes>
      <Route path="/" element={<Food />} />
      <Route path="/:foodId" element={<FoodDetail />} />
    </Routes>
  );
}

export default FoodRoute;
