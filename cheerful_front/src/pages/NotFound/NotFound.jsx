/**@jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as s from "./styles";

function NotFound(props) {
  return (
    <div css={s.layout}>
      <div css={s.title}>404</div>
      <div css={s.subTitle}>페이지를 찾을 수 없습니다.</div>
      <div css={s.content}>존재하지 않는 주소를 입력하셨거나,</div>
      <div css={s.content}>
        요청하신 페이지의 주소가 변경 혹은 삭제되어 찾을 수 없습니다.
      </div>
      <div css={s.homeButton}>
        <Link to={"/"}>Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
