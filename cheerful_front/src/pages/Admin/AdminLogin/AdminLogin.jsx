/**@jsxImportSource @emotion/react */
import * as s from "./styles";

function AdminLogin(props) {
  return (
    <div css={s.layout}>
      <div css={s.adminLoginContainer}>
        <span>ADMIN LOGIN</span>
        <input type="text" />
        <input type="password" />
      </div>
    </div>
  );
}

export default AdminLogin;
