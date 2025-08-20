import { useQuery } from "@tanstack/react-query";
import { reqFoodDetail } from "../../api/foodApi/foodApi";

function useFoodDetailQuery(foodId) {
  return useQuery({
    queryKey: ["foodDetail", foodId],
    queryFn: async () => await reqFoodDetail(foodId),
  });
}

export default useFoodDetailQuery;
