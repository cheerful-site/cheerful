import { useQuery } from "@tanstack/react-query";
import { reqMypageFoodLike } from "../../api/mypageApi/mypageApi";

function useMyPageFoodLike(page, size) {
  return useQuery({
    queryKey: ["mypageFoodLike", page, size],
    queryFn: async () => await reqMypageFoodLike(page, size),
  });
}

export default useMyPageFoodLike;
