import { useQuery } from "@tanstack/react-query";
import React from "react";
import { reqSearchFood } from "../../api/searchApi/searchApi";

function useSearchFoodQuery(page, size, searchText) {
  return useQuery({
    queryKey: ["searchFoodList", page, size, searchText],
    queryFn: async () => await reqSearchFood(page, size, searchText),
  });
}

export default useSearchFoodQuery;
