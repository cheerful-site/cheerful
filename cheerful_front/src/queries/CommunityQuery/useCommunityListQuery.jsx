import { useQuery } from "@tanstack/react-query";
import { reqCommunityList } from "../../api/communityApi/communityApi";

function useCommunityListQuery(sort, page, size, categoryId) {
  return useQuery({
    queryKey: ["communityList", sort, page, size, categoryId],
    queryFn: async () => await reqCommunityList(sort, page, size, categoryId),
    retry: false,
  });
}

export default useCommunityListQuery;
