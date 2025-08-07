import React from "react";
import { useNavigate } from "react-router-dom";
import AuthRoute from "../../../routers/AuthRoute";

function Auth(props) {
  const navigate = useNavigate();

  return (
    <>
      <AuthRoute />
    </>
  );
}

export default Auth;
