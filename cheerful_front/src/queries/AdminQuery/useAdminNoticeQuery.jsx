import { useQuery } from "@tanstack/react-query";
import { reqAdminNotice } from "../../api/adminApi/adminApi";

function useAdminNoticeQuery(page, size, categoryId, searchText) {
  return useQuery({
    queryKey: ["adminNotice", page, size, categoryId, searchText],
    queryFn: async () =>
      await reqAdminNotice(page, size, categoryId, searchText),
  });
}

export default useAdminNoticeQuery;
