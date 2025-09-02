import { useQuery } from "@tanstack/react-query";
import { reqMapList } from "../../api/mapApi/mapApi";

function useMapQuery({ lat, lng, radius, categoryId }) {
  return useQuery({
    queryKey: ["mapList", lat, lng, radius, categoryId],
    queryFn: async () => await reqMapList(lat, lng, radius, categoryId),
  });
}

export default useMapQuery;
