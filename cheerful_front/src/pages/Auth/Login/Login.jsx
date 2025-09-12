/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { FaGoogle } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { Link } from "react-router-dom";
import { RiKakaoTalkFill } from "react-icons/ri";
import Footer from "../../../components/Footer/Footer";
import loginLogo from "../../../logo/cheerful_login.png";
import { baseURL } from "../../../api/axios/axios";

function Login(props) {
  return (
    <div>
      <div css={s.layout}>
        <div css={s.container}>
          <div css={s.logo}>
            <img src={loginLogo} alt="" />
          </div>

          <div css={s.horizon}></div>

          <div css={s.snsLogin}>
            <a
              href={`${baseURL}/oauth2/authorization/google`}
              css={s.googleLogin}>
              <FaGoogle />
              Google
            </a>
            <a
              href={`${baseURL}/oauth2/authorization/naver`}
              css={s.naverLogin}>
              <SiNaver />
              Naver
            </a>
            <a
              href={`${baseURL}/oauth2/authorization/kakao`}
              css={s.kakaoLogin}>
              <RiKakaoTalkFill />
              Kakao
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
