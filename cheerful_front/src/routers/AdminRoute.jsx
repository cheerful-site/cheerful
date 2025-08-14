import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";
import AdminManage from "../pages/Admin/AdminManager/AdminManage";
import usePrincipalAdminQuery from "../queries/PrincipalAdminQuery/usePrincipalAdminQuery";

function AdminRoute(props) {
  const principalAdmin = usePrincipalAdminQuery();

  if (principalAdmin.isFetched && principalAdmin.isSuccess) {
    return (
      <Routes>
        <Route path="/manager/:category" element={<AdminManage />} />
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
