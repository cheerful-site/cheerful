import { useQuery } from "@tanstack/react-query";
import { reqMypageCommunityList } from "../../api/mypageApi/mypageApi";

function useMyPageCommunity(page, size) {
  return useQuery({
    querykey: ["mypageCommunity", page, size],
    queryFn: async () => await reqMypageCommunityList(page, size),
  });
}

export default useMyPageCommunity;
