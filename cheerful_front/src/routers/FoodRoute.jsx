import { Route, Routes } from "react-router-dom";
import Food from "../pages/Food/Food/Food";
import FoodDetail from "../pages/Food/FoodDetail/FoodDetail";
import NotFound from "../pages/NotFound/NotFound";

function FoodRoute(props) {
  return (
    <Routes>
      <Route path="/" element={<Food />} />
      <Route path="/:foodId" element={<FoodDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default FoodRoute;
