/**@jsxImportSource @emotion/react */
import { IoMdClose } from "react-icons/io";
import { useAdminModalStore } from "../../stores/useAdminModalStore";
import * as s from "./styles";
import ReactModal from "react-modal";
import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { reqAdminFoodRegister } from "../../api/adminApi/adminApi";

function AdminModal({ mode, categoryName }) {
  const params = useParams();
  const navigate = useNavigate();
  const { openModal, setOpenModal } = useAdminModalStore();
  const [inputValue, setInputValue] = useState({
    categoryId: "1",
    title: "",
    content: "",
    price: "",
  });
  const [files, setFiles] = useState([]);

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
      if (files.length + e.target.files.length > 5) {
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
    // formData.append(
    //   "communityCategoryId",
    //   parseInt(inputValue.communityCategoryId)
    // );
    // formData.append("title", inputValue.title);
    // formData.append("content", inputValue.content);
    // files.forEach((f) => formData.append("files", f.file));

    // reqCommunityRegister(formData);
    // // console.log(formData);
    // navigate("/community/1");
    if (categoryName === "food") {
      formData.append("categoryId", inputValue.categoryId);
      formData.append("title", inputValue.title);
      formData.append("content", inputValue.content);
      formData.append("price", inputValue.price);
      files.forEach((f) => formData.append("files", f.file));
      reqAdminFoodRegister(formData);
      navigate("/admin/food");
      return;
    }
    if (categoryName === "notice") {
    }
  };

  const handleModifyOnClick = () => {};

  console.log(categoryName);

  return (
    <ReactModal
      style={{
        overlay: {
          backgroundColor: "#000000cc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        },
        content: {
          position: "static",
          border: "none",
          borderRadius: "1rem",
          padding: "0",
          overflow: "hidden",
        },
      }}
      isOpen={openModal}
      appElement={document.getElementById("root")}>
      {/* ///////// */}

      <div css={s.layout}>
        <div css={s.closeModal}>
          <span onClick={() => setOpenModal(false)}>
            <IoMdClose />
          </span>
        </div>

        <div css={s.registerContainer}>
          <div css={s.registerInputTitle}>
            <select name="categoryId" id="" onChange={handleOnChange}>
              {params.categoryId === "notice" ? (
                <>
                  <option value="1">공지사항</option>
                  <option value="2">매거진</option>
                  <option value="3">이벤트</option>
                </>
              ) : (
                <>
                  <option value="1">사료</option>
                  <option value="2">간식</option>
                </>
              )}
            </select>

            <input
              type="text"
              name="title"
              onChange={handleOnChange}
              placeholder="제목을 입력해주세요."
            />
            {params.categoryId === "food" ? (
              <input
                type="number"
                name="price"
                onChange={handleOnChange}
                placeholder="가격을 입력해주세요."
              />
            ) : (
              <></>
            )}
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
          {mode === "register" ? (
            <button css={s.modeButton} onClick={handleRegisterOnClick}>
              등록하기
            </button>
          ) : (
            <button css={s.modeButton} onClick={handleModifyOnClick}>
              수정하기
            </button>
          )}
        </div>
      </div>
    </ReactModal>
  );
}

export default AdminModal;
