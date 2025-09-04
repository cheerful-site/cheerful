/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import loadingDog from "../../../logo/cheerful_loading_dog.gif";
import LoadingText from "../../../logo/cheerful_loading_text.png";

function Loading(props) {
  return (
    <div css={s.layout}>
      <img css={s.loadingIcon} src={loadingDog} alt="" />
      <img css={s.loadingText} src={LoadingText} alt="" />
    </div>
  );
}

export default Loading;
