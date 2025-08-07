/**@jsxImportSource @emotion/react */
import { FaSearch } from "react-icons/fa";
import * as s from "./styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import usePrincipalQuery from "../../queries/PrincipalQuery/usePrincipalQuery";

function Header(props) {
  const [login, setLogin] = useState(false);
  const principalQuery = usePrincipalQuery();
  console.log(principalQuery.data);

  return (
    <div css={s.layout}>
      <div>
        <Link to={"/"}>
          <img css={s.headerLogo} src="../../logo/cheerful_header.png" alt="" />
        </Link>
      </div>

      <div css={s.category}>
        <Link to={"/"}>HOME</Link>
        <Link to={"/community"}>Community</Link>
        <Link to={"/food"}>Food</Link>
        <Link to={"/map"}>Map</Link>
        <Link to={"/notice"}>Notice</Link>
      </div>

      {login === false ? (
        <Link to={"/auth/login"} css={s.loginButton}>
          로그인
        </Link>
      ) : (
        <div css={s.profile}>
          <div css={s.searchIconBox}>
            <Link to={"/search"}>
              <FaSearch css={s.searchIcon} />
            </Link>
          </div>
          <div css={s.profileImgBox}>
            <img
              src="../../logo/cheerful_noprofile.png"
              alt=""
              css={s.profileImg}
            />
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
