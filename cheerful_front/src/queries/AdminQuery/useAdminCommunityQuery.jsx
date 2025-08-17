import { useQuery } from "@tanstack/react-query";
import { reqAdminCommunity } from "../../api/adminApi/adminApi";

function useAdminCommunityQuery(page, size, categoryId, searchText) {
  return useQuery({
    queryKey: ["adminCommunity", page, size, categoryId, searchText],
    queryFn: async () =>
      await reqAdminCommunity(page, size, categoryId, searchText),
  });
}

export default useAdminCommunityQuery;
