import { useQuery } from "@tanstack/react-query";
import React from "react";
import { reqAdminUsers } from "../../api/adminApi/adminApi";

function useAdminUsersQuery(props) {
  return useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => await reqAdminUsers(),
  });
}

export default useAdminUsersQuery;
