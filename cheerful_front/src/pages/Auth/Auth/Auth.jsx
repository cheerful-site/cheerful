import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthRoute from "../../../routers/AuthRoute";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";

function Auth(props) {
  return (
    <>
      <AuthRoute />
    </>
  );
}

export default Auth;
