import { useQuery } from "@tanstack/react-query";
import { reqBestFood } from "../../api/homeApi/homeApi";

function useHomeBestFoodQuery(props) {
  return useQuery({
    queryKey: ["bestFood"],
    queryFn: async () => await reqBestFood(),
  });
}

export default useHomeBestFoodQuery;
