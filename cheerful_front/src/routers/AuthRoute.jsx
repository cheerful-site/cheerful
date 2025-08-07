import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import OAuthLogin from "../pages/Auth/OAuthLogin/OAuthLogin";
import Login from '../pages/Auth/Login/Login';

function AuthRoute(props) {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/oauth2/login" element={<OAuthLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRoute;
