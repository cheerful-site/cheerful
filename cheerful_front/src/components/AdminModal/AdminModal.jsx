/**@jsxImportSource @emotion/react */
import { IoMdClose } from "react-icons/io";
import { useAdminModalStore } from "../../stores/useAdminModalStore";
import * as s from "./styles";
import ReactModal from "react-modal";
import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { useParams } from "react-router-dom";

function AdminModal({ mode }) {
  const params = useParams();
  const { openModal, setOpenModal } = useAdminModalStore();
  const [inputValue, setInputValue] = useState({
    categoryId: "1",
    title: "",
    content: "",
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

  const handleRegisterOnClick = () => {};
  const handleModifyOnClick = () => {};

  console.log(mode);

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
            {params.categoryId === "notice" ? (
              <select
                name="communityCategoryId"
                id=""
                onChange={handleOnChange}>
                <option value="1">공지사항</option>
                <option value="2">매거진</option>
                <option value="3">이벤트</option>
              </select>
            ) : (
              <></>
            )}
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
