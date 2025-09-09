import { useQuery } from "@tanstack/react-query";
import { reqCommunityDetail } from "../../api/communityApi/communityApi";

function useCommunityDetailQuery(categoryId, communityId) {
  return useQuery({
    queryKey: ["communityDetail", categoryId, communityId],
    queryFn: async () => await reqCommunityDetail(categoryId, communityId),
  });
}

export default useCommunityDetailQuery;
