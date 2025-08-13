import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthRoute from "../../../routers/AuthRoute";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";

function Auth(props) {
  const navigate = useNavigate();
  const principalQuery = usePrincipalQuery();

  // useEffect(() => {
  //   if (principalQuery.isFetched && principalQuery.isSuccess) {
  //     navigate("/", {
  //       replace: true,
  //     });
  //   }
  // }, [principalQuery.isFetched]);

  return (
    <>
      <AuthRoute />
    </>
  );
}

export default Auth;
