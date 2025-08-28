import { useQuery } from "@tanstack/react-query";
import { reqBestCommunity } from "../../api/homeApi/homeApi";

function useHomeBestCommunityQuery(props) {
  return useQuery({
    queryKey: ["bestCommunity"],
    queryFn: async () => await reqBestCommunity(),
  });
}

export default useHomeBestCommunityQuery;
