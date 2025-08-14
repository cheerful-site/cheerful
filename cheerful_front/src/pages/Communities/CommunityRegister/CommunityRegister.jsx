/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";

function CommunityRegister(props) {
  const [inputValue, setInputValue] = useState({
    communityCategoryId: "",
    title: "",
    content: "",
  });

  const navigate = useNavigate();
  const principalQuery = usePrincipalQuery();
  const user = principalQuery?.data?.data.body.user;
  // console.log(user);

  const handleOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: [e.target.value],
    }));
  };

  const handleRegisterOnClick = () => {
    const reqData = {
      communityCategoryId: inputValue.communityCategoryId,
      title: inputValue.title,
      content: inputValue.content,
    };

    // reqCommunityRegister(reqData);

    // try {
    //   reqCommunityRegister(registerPost);
    //   // navigate("/community/1");
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <>
      <div css={s.layout}>
        <div css={s.registerContainer}>
          <div css={s.registerUser}>
            <img src={user?.profileImgPath} alt="" />
            <span>{user?.username}</span>
          </div>

          <div css={s.registerInputTitle}>
            <select name="communityCategoryId" id="" onChange={handleOnChange}>
              <option value="2">자유게시판</option>
              <option value="3">강아지</option>
              <option value="4">고양이</option>
              <option value="5">특수동물</option>
              <option value="6">실종/목격</option>
              <option value="7">임보/입양</option>
            </select>
            <input
              type="text"
              name="title"
              onChange={handleOnChange}
              placeholder="제목을 입력해주세요."
            />
          </div>

          <div css={s.registerTextArea}>
            <textarea
              name="content"
              onChange={handleOnChange}
              placeholder="내용을 작성해 주세요. (최소 5자)"
            />
          </div>

          <button css={s.registerButton} onClick={handleRegisterOnClick}>
            등록하기
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CommunityRegister;
