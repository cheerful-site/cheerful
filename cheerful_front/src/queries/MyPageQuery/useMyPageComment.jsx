import { useQuery } from "@tanstack/react-query";
import { reqMypageComment } from "../../api/mypageApi/mypageApi";

function useMyPageComment(page, size) {
  return useQuery({
    queryKey: ["mypageComment", page, size],
    queryFn: async () => await reqMypageComment(page, size),
  });
}

export default useMyPageComment;
