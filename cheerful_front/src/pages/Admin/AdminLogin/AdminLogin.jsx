/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import logo from "../../../../logo/cheerful_login.png";
import { useState } from "react";
import { reqAdminLogin } from "../../../api/adminApi/adminApi";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function AdminLogin(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginOnClick = async () => {
    if (!inputValue.username.trim() || !inputValue.password.trim()) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }
    try {
      const res = await reqAdminLogin(inputValue);
      // const accessToken = searchParams.get("accessToken");
      const { accessToken } = res.data.body;
      localStorage.setItem("AccessToken", `Bearer ${accessToken}`);
      queryClient
        .invalidateQueries({
          queryKey: ["principal"],
        })
        .then(() => {
          navigate("/admin/manager/users");
        });
    } catch (e) {
      console.error("login failed:", e);
    }
  };

  return (
    <div css={s.layout}>
      <div css={s.adminLoginContainer}>
        <img src={logo} alt="" />

        <div css={s.horizon}></div>

        <span>ADMIN LOGIN</span>
        <input
          type="text"
          name="username"
          placeholder="아이디"
          onChange={handleOnChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleOnChange}
        />
        <button onClick={handleLoginOnClick}>로그인</button>
      </div>
    </div>
  );
}

export default AdminLogin;
