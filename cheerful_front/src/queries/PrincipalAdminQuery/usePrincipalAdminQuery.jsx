import { useQuery } from "@tanstack/react-query";
import { reqPrincipalAdmin } from "../../api/authApi/authApi";

function usePrincipalAdminQuery(props) {
  return useQuery({
    queryKey: ["principalAdmin"],
    queryFn: async () => await reqPrincipalAdmin(),
  });
}

export default usePrincipalAdminQuery;
