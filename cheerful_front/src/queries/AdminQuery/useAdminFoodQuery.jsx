import { useQuery } from "@tanstack/react-query";
import { reqAdminFood } from "../../api/adminApi/adminApi";

function useAdminFoodQuery(page, size, searchText) {
  return useQuery({
    queryKey: ["adminFood", page, size, searchText],
    queryFn: async () => await reqAdminFood(page, size, searchText),
  });
}

export default useAdminFoodQuery;
