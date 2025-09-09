import { useQuery } from "@tanstack/react-query";
import React from "react";
import { reqNoticeList } from "../../api/noticeApi/noticeApi";

function useNoticeListQuery(page, size, categoryId) {
  return useQuery({
    queryKey: ["noticeList", page, size, categoryId],
    queryFn: async () => await reqNoticeList(page, size, categoryId),
  });
}

export default useNoticeListQuery;
