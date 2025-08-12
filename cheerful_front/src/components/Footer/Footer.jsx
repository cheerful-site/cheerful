/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Footer(props) {
  const navigate = useNavigate();
  const handleMoveAdminLoginOnClick = () => {
    navigate("/admin/login");
  };
  return (
    <div css={s.layout}>
      <div css={s.content}>
        <Link to={""}>개인정보취급방침</Link>
        <Link to={""}>서비스 이용약관</Link>
        <Link to={""}>고객문의</Link>
        <Link to={""}>제휴문의</Link>
        <Link to={""}>도움말</Link>
      </div>

      <div css={s.snsContainer}>
        <Link to={""}>
          <FaYoutube />
        </Link>
        <Link to={""}>
          <FaFacebookF />
        </Link>
        <Link to={""}>
          <FaTwitter />
        </Link>
        <Link to={""}>
          <FaInstagram />
        </Link>
      </div>

      <div css={s.company}>
        Cheerful @ <div onDoubleClick={handleMoveAdminLoginOnClick}>2025.</div>{" "}
        All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
