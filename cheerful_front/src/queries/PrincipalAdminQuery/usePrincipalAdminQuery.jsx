import { useQuery } from "@tanstack/react-query";
import { reqPrincipal } from "../../api/authApi/authApi";

function usePrincipalAdminQuery(props) {
  return useQuery({
    queryKey: ["principalAdmin"],
    queryFn: async () => await reqPrincipal(),
  });
}

export default usePrincipalAdminQuery;
