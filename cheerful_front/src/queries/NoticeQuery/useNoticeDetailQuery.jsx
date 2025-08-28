import { useQuery } from "@tanstack/react-query";
import { reqNoticeDetail } from "../../api/noticeApi/noticeApi";

function useNoticeDetailQuery(categoryId, noticeId) {
  return useQuery({
    queryKey: ["noticeDetail", categoryId, noticeId],
    queryFn: async () => await reqNoticeDetail(categoryId, noticeId),
  });
}

export default useNoticeDetailQuery;
