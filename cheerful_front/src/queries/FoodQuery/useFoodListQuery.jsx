import { useQuery } from "@tanstack/react-query";
import { reqFoodList } from "../../api/foodApi/foodApi";

function useFoodListQuery(sort, page, size) {
  return useQuery({
    queryKey: ["foodList", sort, page, size],
    queryFn: async () => await reqFoodList(sort, page, size),
  });
}

export default useFoodListQuery;
