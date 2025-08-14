import { useQuery } from "@tanstack/react-query";
import { reqCommunityList } from "../../api/communityApi/communityApi";

function useCommunityListQuery(page, size, categoryId) {
  const token = localStorage.getItem("AccessToken");

  return useQuery({
    queryKey: ["communityList", page, size, categoryId],
    queryFn: async () => await reqCommunityList(page, size, categoryId),
    enabled: !!token,
    retry: false,
  });
}

export default useCommunityListQuery;
