import { useQuery } from "@tanstack/react-query";
import { reqAdminUsers } from "../../api/adminApi/adminApi";

function useAdminUsersQuery({ page, size, searchText }) {
  return useQuery({
    queryKey: ["adminUsers", page, size, searchText],
    queryFn: async () => await reqAdminUsers(page, size, searchText),
  });
}

export default useAdminUsersQuery;
