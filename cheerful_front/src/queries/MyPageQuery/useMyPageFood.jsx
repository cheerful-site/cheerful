import { useQuery } from "@tanstack/react-query";
import { reqMypageFoodLike } from "../../api/mypageApi/mypageApi";

function useMyPageFood(page, size) {
  return useQuery({
    querykey: ["mypageFood", page, size],
    queryFn: async () => await reqMypageFoodLike(page, size),
  });
}

export default useMyPageFood;
