/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useEffect, useState } from "react";
import { reqAdminFoodModify } from "../../api/adminApi/adminApi";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FiPlus, FiX } from "react-icons/fi";

function AdminManagementFoodModifyModal({ isOpen, setOpen, modifyData }) {
  const [files, setFiles] = useState([]);
  // console.log(modifyData);

  const categoryNameToId = (value) => {
    if (value === "사료") return 1;
    if (value === "간식") return 2;
  };

  const [inputValue, setInputValue] = useState({
    foodId: "",
    categoryId: "1",
    title: "",
    content: "",
    price: "",
    foodAddress: "",
  });

  useEffect(() => {
    setInputValue({
      foodId: modifyData[0]?.value,
      categoryId: categoryNameToId(modifyData[1]?.value),
      title: modifyData[3]?.value,
      content: modifyData[4]?.value,
      price: modifyData[6]?.value,
      foodAddress: modifyData[5]?.value,
    });
  }, [modifyData]);

  // console.log(inputValue);

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
    if (confirm("등록하시겠습니까?")) {
      if (inputValue.price === "" || inputValue.price === 0) {
        alert("가격을 입력해주세요.");
        return;
      }
      try {
        formData.append("foodId", inputValue.foodId);
        formData.append("foodCategoryId", inputValue.categoryId);
        formData.append("title", inputValue.title);
        formData.append("content", inputValue.content);
        formData.append("price", inputValue.price);
        formData.append("foodAddress", inputValue.foodAddress);
        files.forEach((f) => formData.append("files", f.file));
        reqAdminFoodModify(formData);
        setOpen(false);
        setFiles([]);
        // console.log(inputValue);
      } catch (error) {
        console.log(error);
        setFiles([]);
      }
    }
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
            <select
              name="categoryId"
              id=""
              onChange={handleOnChange}
              value={inputValue.categoryId}>
              <option value="1">사료</option>
              <option value="2">간식</option>
            </select>

            <input
              type="text"
              name="title"
              onChange={handleOnChange}
              placeholder="제목을 입력해주세요."
              value={inputValue.title}
            />

            <input
              type="number"
              name="price"
              onChange={handleOnChange}
              placeholder="가격을 입력해주세요."
              value={inputValue.price}
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

          <div css={s.urlAddress}>
            <input
              type="text"
              name="foodAddress"
              onChange={handleOnChange}
              placeholder="상품 URL을 입력해 주세요."
              value={inputValue.foodAddress}
            />
          </div>

          <div css={s.registerTextArea}>
            <textarea
              name="content"
              onChange={handleOnChange}
              placeholder="내용을 작성해 주세요. (최소 5자)"
              value={inputValue.content}
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
