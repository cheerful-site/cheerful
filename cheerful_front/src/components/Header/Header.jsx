/**@jsxImportSource @emotion/react */
import { FaSearch } from "react-icons/fa";
import * as s from "./styles";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header(props) {
  const [login, setLogin] = useState(false);

  return (
    <div css={s.layout}>
      <div>
        <img css={s.headerLogo} src="../../logo/cheerful_header.png" alt="" />
      </div>

      <div css={s.category}>
        <Link to={"/"}>HOME</Link>
        <Link to={"/community"}>Community</Link>
        <Link to={"/food"}>Food</Link>
        <Link to={"/map"}>Map</Link>
        <Link to={"/notice"}>Notice</Link>
      </div>

      {login === false ? (
        <div css={s.loginButton}>
          <Link to={"/login"}>로그인</Link>
        </div>
      ) : (
        <div css={s.profile}>
          <div css={s.searchIconBox}>
            <FaSearch css={s.searchIcon} />
          </div>
          <div css={s.profileImg}>
            <img src="" alt="" />
          </div>
          <div css={s.profileEdit}>
            <div>username</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
