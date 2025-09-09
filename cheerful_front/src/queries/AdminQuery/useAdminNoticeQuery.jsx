import { useQuery } from "@tanstack/react-query";
import { reqAdminNotice } from "../../api/adminApi/adminApi";

function useAdminNoticeQuery({ page, size, noticeCategoryId, searchText }) {
  return useQuery({
    queryKey: ["adminNotice", page, size, noticeCategoryId, searchText],
    queryFn: async () =>
      await reqAdminNotice(page, size, noticeCategoryId, searchText),
  });
}

export default useAdminNoticeQuery;
