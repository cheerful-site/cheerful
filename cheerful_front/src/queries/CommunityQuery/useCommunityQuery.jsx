import { useQuery } from "@tanstack/react-query";
import { reqCommunity } from "../../api/communityApi/communityApi";

function useCommunityQuery(category) {
  return useQuery({
    queryKey: ["community", category],
    queryFn: async () => await reqCommunity(category),
  });
}

export default useCommunityQuery;
