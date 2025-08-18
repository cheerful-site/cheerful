import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";
import AdminManage from "../pages/Admin/AdminManager/AdminManage";
import usePrincipalQuery from "../queries/PrincipalQuery/usePrincipalQuery";

function AdminRoute(props) {
  const principal = usePrincipalQuery();

  if (principal?.data.data.body) {
    return (
      <Routes>
        <Route path="/:categoryId" element={<AdminManage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    );
  }
}

export default AdminRoute;
