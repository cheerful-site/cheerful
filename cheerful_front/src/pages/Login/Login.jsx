/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import Footer from "../../components/Footer/Footer";
import { FaGoogle } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { Link } from "react-router-dom";
import { RiKakaoTalkFill } from "react-icons/ri";

function Login(props) {
  return (
    <div>
      <div css={s.layout}>
        <div css={s.container}>
          <div css={s.logo}>
            <img src="../../logo/cheerful_login.png" alt="" />
          </div>

          <div css={s.horizon}></div>

          <div css={s.snsLogin}>
            <Link
              to={"http://localhost:8080/oauth2/authorization/google"}
              css={s.googleLogin}>
              <FaGoogle />
              Google
            </Link>
            <Link
              to={"http://localhost:8080/oauth2/authorization/naver"}
              css={s.naverLogin}>
              <SiNaver />
              Naver
            </Link>
            <Link
              to={"http://localhost:8080/oauth2/authorization/kakao"}
              css={s.kakaoLogin}>
              <RiKakaoTalkFill />
              Kakao
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
