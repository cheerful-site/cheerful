/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import logo from "../../../../logo/cheerful_login.png";

function AdminLogin(props) {
  return (
    <div css={s.layout}>
      <div css={s.adminLoginContainer}>
        <img src={logo} alt="" />

        <div css={s.horizon}></div>

        <span>ADMIN LOGIN</span>
        <input type="text" placeholder="아이디" />
        <input type="password" placeholder="비밀번호" />
        <button>로그인</button>
      </div>
    </div>
  );
}

export default AdminLogin;
