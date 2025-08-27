import { useQuery } from "@tanstack/react-query";
import React from "react";
import { reqSearchCommunity } from "../../api/searchApi/searchApi";

function useSearchCommunityQuery(page, size, searchText, categoryId) {
  return useQuery({
    queryKey: ["searchCommunityList", page, size, searchText, categoryId],
    queryFn: async () =>
      await reqSearchCommunity(page, size, searchText, categoryId),
  });
}

export default useSearchCommunityQuery;
