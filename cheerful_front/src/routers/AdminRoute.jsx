import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";
import AdminManage from "../pages/Admin/AdminManager/AdminManage";

function AdminRoute(props) {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/manager" element={<AdminManage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AdminRoute;
