import { useQuery } from "@tanstack/react-query";
import { reqCommunityList } from "../../api/communityApi/communityApi";

function useCommunityListQuery(page, size, categoryId) {
  return useQuery({
    queryKey: ["communityList", page, size, categoryId],
    queryFn: async () => await reqCommunityList(page, size, categoryId),
    retry: false,
  });
}

export default useCommunityListQuery;
