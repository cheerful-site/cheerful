/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import Footer from "../../../components/Footer/Footer";
import { FiPlus, FiX } from "react-icons/fi";
import { reqCommunityRegister } from "../../../api/communityApi/communityApi";

function CommunityRegister(props) {
  const [inputValue, setInputValue] = useState({
    communityCategoryId: "2",
    title: "",
    content: "",
  });
  const [files, setFiles] = useState([]);

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

  const handlePlusOnClick = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("multiple", "true");
    fileInput.click();
    fileInput.onchange = async (e) => {
      if (files.length + e.target.files.length > 10) {
        return;
      }

      const filesArray = [...e.target.files];

      //async await의 경우 return을 해줘야기 떄문에 resolve를 사용하지 못함
      //Promise가 들어가 있는 배열이여야 Promise.all
      Promise.all(
        filesArray.map((file) => {
          return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
              resolve({ file, dataUrl: e.target.result });
            };
            fileReader.readAsDataURL(file);
          });
        })
      ).then((resolves) => {
        setFiles((prev) => [...prev, ...resolves]);
      });
    };
  };

  const handleImgDeleteOnClick = (index) => {
    setFiles(files.filter((file, i) => i !== index));
  };

  const handleRegisterOnClick = () => {
    const formData = new FormData();
    formData.append(
      "communityCategoryId",
      parseInt(inputValue.communityCategoryId)
    );
    formData.append("title", inputValue.title);
    formData.append("content", inputValue.content);
    files.forEach((f) => formData.append("files", f.file));

    reqCommunityRegister(formData);
    // console.log(formData);
    navigate("/community/1");
  };

  return (
    <>
      <div css={s.layout}>
        <div css={s.registerContainer}>
          <div css={s.registerUser}>
            <img src={user?.profileImgUrl} alt="" />
            <span>{user?.name}</span>
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

          <div css={s.imgListContainer}>
            {files.length < 5 && ( //파일 갯수
              <div css={s.imgContainer}>
                <div css={s.plus} onClick={handlePlusOnClick}>
                  <FiPlus />
                </div>
              </div>
            )}
            {files.map(
              (
                file,
                index // 파일 미리보기 및 삭제
              ) => (
                <div css={s.imgContainer}>
                  <div css={s.imgBox(`${file.dataUrl}`)}>
                    <div css={s.fixButton}>
                      <FiX onClick={() => handleImgDeleteOnClick(index)} />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div css={s.registerTextArea}>
            <textarea
              name="content"
              onChange={handleOnChange}
              placeholder="내용을 작성해 주세요. (최소 5자)"
            />
          </div>
          {/* <ReactQuill></ReactQuill> */}
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
