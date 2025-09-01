/**@jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import ReactModal from "react-modal";
import { reqAdminFoodRegister } from "../../api/adminApi/adminApi";
import { IoMdClose } from "react-icons/io";
import { FiPlus, FiX } from "react-icons/fi";

function AdminManagementFoodRegisterModal({ isOpen, setOpen }) {
  const [files, setFiles] = useState([]);

  const [inputValue, setInputValue] = useState({
    categoryId: "1",
    title: "",
    content: "",
    price: "",
    foodAddress: "",
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

  const handleRegisterOnClick = () => {
    const formData = new FormData();

    if (confirm("등록하시겠습니까?")) {
      if (inputValue.title === "") {
        alert("제목을 작성해주세요.");
      }
      if (inputValue.content === "") {
        alert("내용을 작성해주세요.");
      }
      if (inputValue.price === "" || inputValue.price === 0) {
        alert("가격을 입력해주세요.");
      }
      if (inputValue.foodAddress === "") {
        alert("제품주소를 입력해주세요.");
      }
      if (files.length === 0) {
        alert("이미지를 추가해주세요.");
      }

      try {
        formData.append("foodCategoryId", inputValue.categoryId);
        formData.append("title", inputValue.title);
        formData.append("content", inputValue.content);
        formData.append("price", inputValue.price);
        formData.append("foodAddress", inputValue.foodAddress);
        files.forEach((f) => formData.append("files", f.file));

        reqAdminFoodRegister(formData, inputValue.categoryId);
        setOpen(false);
        setFiles([]);
      } catch (error) {
        alert("게시물 등록에 실패했습니다. 다시 시도 해주세요.");
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
      {/* ///////// */}

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
            <input
              type="number"
              name="price"
              onChange={handleOnChange}
              placeholder="가격을 입력해주세요."
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
            />
          </div>

          <div css={s.registerTextArea}>
            <textarea
              name="content"
              onChange={handleOnChange}
              placeholder="내용을 작성해 주세요. (최소 5자)"
            />
          </div>
          <button css={s.modeButton} onClick={handleRegisterOnClick}>
            등록하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

export default AdminManagementFoodRegisterModal;
