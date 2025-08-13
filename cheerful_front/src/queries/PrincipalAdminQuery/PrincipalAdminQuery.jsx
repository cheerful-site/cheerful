import { useQuery } from "@tanstack/react-query";
import { reqPrincipalAdmin } from "../../api/authApi/authApi";

function PrincipalAdminQuery(props) {
  return useQuery({
    queryKey: ["principalAdmin"],
    queryFn: async () => await reqPrincipalAdmin(),
  });
}

export default PrincipalAdminQuery;
