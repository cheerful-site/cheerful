import { useQuery } from "@tanstack/react-query";
import React from "react";
import { reqCommunityList } from "../../api/communityApi/communityApi";

function useCommunityListQuery({ page, size }) {
  return useQuery({
    queryKey: ["communityList", page, size],
    queryFn: async () => await reqCommunityList(page, size),
  });
}

export default useCommunityListQuery;
