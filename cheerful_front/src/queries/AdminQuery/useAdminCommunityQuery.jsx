import { useQuery } from "@tanstack/react-query";
import { reqAdminCommunity } from "../../api/adminApi/adminApi";

function useAdminCommunityQuery({
  page,
  size,
  communityCategoryId,
  searchText,
}) {
  return useQuery({
    queryKey: ["adminCommunity", page, size, communityCategoryId, searchText],
    queryFn: async () =>
      await reqAdminCommunity(page, size, communityCategoryId, searchText),
  });
}

export default useAdminCommunityQuery;
