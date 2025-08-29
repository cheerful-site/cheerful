/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useState } from "react";
import { reqAdminFoodModify } from "../../api/adminApi/adminApi";

function AdminManagementFoodModifyModal({ isOpen, setOpen }) {
  const [files, setFiles] = useState([]);

  const [inputValue, setInputValue] = useState({
    categoryId: "1",
    title: "",
    content: "",
    price: "",
  });

  const handleOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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

  const handleModalCloseOnClick = () => {
    setFiles([]);
    setOpen(false);
  };

  const handleModifyOnClick = () => {
    const formData = new FormData();
    formData.append("noticeCategoryId", inputValue.categoryId);
    formData.append("title", inputValue.title);
    formData.append("content", inputValue.content);
    files.forEach((f) => formData.append("files", f.file));

    reqAdminFoodModify(formData, inputValue.categoryId);
    setOpen(false);
  };

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
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      appElement={document.getElementById("root")}>
      <div css={s.layout}>
        <div css={s.closeModal}>
          <span onClick={handleModalCloseOnClick}>
            <IoMdClose />
          </span>
        </div>
        <div css={s.registerContainer}>
          <div css={s.registerInputTitle}>
            <select name="categoryId" id="" onChange={handleOnChange}>
              <option value="1">사료</option>
              <option value="2">간식</option>
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
          <button css={s.modeButton} onClick={handleModifyOnClick}>
            수정하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

export default AdminManagementFoodModifyModal;
