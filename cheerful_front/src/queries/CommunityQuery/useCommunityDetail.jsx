import { useQuery } from "@tanstack/react-query";
import { reqCommunityDetail } from "../../api/communityApi/communityApi";

function useCommunityDetailQuery(communityId) {
  return useQuery({
    queryKey: ["communityDetail", communityId],
    queryFn: async () => await reqCommunityDetail(communityId),
  });
}

export default useCommunityDetailQuery;
