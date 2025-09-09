/**@jsxImportSource @emotion/react */
import { IoMdClose } from "react-icons/io";
import {
  useAdminModalStore,
  useAdminModifyDataStore,
} from "../../stores/useAdminModalStore";
import * as s from "./styles";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import {
  reqAdminFoodModify,
  reqAdminFoodRegister,
  reqAdminNoticeModify,
  reqAdminNoticeRegister,
} from "../../api/adminApi/adminApi";

function AdminModal({ isOpen, setOpen, mode, categoryName }) {
  const params = useParams();
  const { openModal, setOpenModal } = useAdminModalStore();
  const [inputValue, setInputValue] = useState({
    categoryId: "1",
    title: "",
    content: "",
    price: "",
  });
  const [files, setFiles] = useState([]);
  const { modifyData, setModifyData } = useAdminModifyDataStore();
  const [modifyInputValue, setModifyInputValue] = useState({
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

  const handleModifyOnChange = (e) => {
    setModifyInputValue((prev) => ({
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
    setOpenModal(false);
  };

  useEffect(() => {
    setFiles([]);
  }, [mode]);

  const handleRegisterOnClick = () => {
    const formData = new FormData();
    if (categoryName === "food") {
      formData.append("foodCategoryId", inputValue.categoryId);
      formData.append("title", inputValue.title);
      formData.append("content", inputValue.content);
      formData.append("price", inputValue.price);
      files.forEach((f) => formData.append("files", f.file));

      reqAdminFoodRegister(formData);
      setOpenModal(false);
    }
    if (categoryName === "notice") {
      formData.append("noticeCategoryId", inputValue.categoryId);
      formData.append("title", inputValue.title);
      formData.append("content", inputValue.content);
      files.forEach((f) => formData.append("files", f.file));

      reqAdminNoticeRegister(formData, inputValue.categoryId);
      setOpenModal(false);
    }
  };

  const handleModifyOnClick = () => {
    const formData = new FormData();
    if (categoryName === "food") {
      formData.append("foodId", modifyData[0]?.value);
      if (modifyInputValue.categoryId === "사료") {
        formData.append("foodCategoryId", 1);
      }
      if (modifyInputValue.categoryId === "간식") {
        formData.append("foodCategoryId", 2);
      }
      formData.append("title", modifyInputValue.title);
      formData.append("content", modifyInputValue.content);
      formData.append("price", modifyInputValue.price);

      const existingImages = [];
      files.forEach((f) => {
        if (f.file) {
          // 새로 업로드된 파일
          formData.append("files", f.file);
        } else if (f.dataUrl) {
          // 기존 이미지 URL은 별도 배열로 서버에 전달
          existingImages.push(f.dataUrl);
        }
      });

      if (existingImages.length > 0) {
        formData.append("existingFiles", JSON.stringify(existingImages));
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      reqAdminFoodModify(formData);
      setOpenModal(false);
      return;
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
        {mode === "register" ? (
          //////////////////////// 등록하기
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
        ) : (
          //////////////////////// 수정하기
          <div css={s.registerContainer}>
            <div css={s.registerInputTitle}>
              <select
                name="categoryId"
                id=""
                onChange={handleModifyOnChange}
                value={modifyInputValue.categoryId}>
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
                onChange={handleModifyOnChange}
                placeholder="제목을 입력해주세요."
                value={modifyInputValue.title}
              />
              {params.categoryId === "food" ? (
                <input
                  type="number"
                  name="price"
                  onChange={handleModifyOnChange}
                  placeholder="가격을 입력해주세요."
                  value={modifyInputValue.price}
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
                  <div key={index} css={s.imgContainer}>
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
                onChange={handleModifyOnChange}
                placeholder="내용을 작성해 주세요. (최소 5자)"
                value={modifyInputValue.content}
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
        )}
      </div>
    </ReactModal>
  );
}

export default AdminModal;
