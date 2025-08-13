/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import logo from "../../../../logo/cheerful_login.png";
import { useState } from "react";
import { reqAdminLogin } from "../../../api/adminApi/adminApi";

function AdminLogin(props) {
  const [inputValue, setInputValue] = useState({
    adminName: "",
    adminPassword: "",
  });
  const handleOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: [e.target.value],
    }));
  };

  const handleLoginOnClick = () => {
    const admin = {
      adminLoginId: inputValue.adminName,
      password: inputValue.adminPassword,
    };

    reqAdminLogin(admin);
  };

  return (
    <div css={s.layout}>
      <div css={s.adminLoginContainer}>
        <img src={logo} alt="" />

        <div css={s.horizon}></div>

        <span>ADMIN LOGIN</span>
        <input
          type="text"
          name="adminname"
          placeholder="아이디"
          onChange={handleOnChange}
        />
        <input
          type="password"
          name="adminpassword"
          placeholder="비밀번호"
          onChange={handleOnChange}
        />
        <button onClick={handleLoginOnClick}>로그인</button>
      </div>
    </div>
  );
}

export default AdminLogin;
