import { useQuery } from "@tanstack/react-query";
import { reqFoodList } from "../../api/foodApi/foodApi";

function useFoodListQuery(page, size) {
  return useQuery({
    queryKey: ["foodList", page, size],
    queryFn: async () => await reqFoodList(page, size),
  });
}

export default useFoodListQuery;
