/**@jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import useFoodDetailQuery from "../../../queries/FoodQuery/useFoodDetailQuery";
import * as s from "./styles";
import { baseURL } from "../../../api/axios/axios";
import like from "../../../../logo/cheerful_like.png";
import unlike from "../../../../logo/cheerful_unlike.png";
import Footer from "../../../components/Footer/Footer";
import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

function FoodDetail(props) {
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const food = useFoodDetailQuery(params.foodId);
  const foodDetail = food?.data?.data?.body;
  console.log(foodDetail);

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

  const handleOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: [e.target.value],
    }));
  };
  const handleRegisterOnClick = () => {
    const formData = new FormData();
    formData.append("content", inputValue.content);
    files.forEach((f) => formData.append("files", f.file));
    // console.log(formData);
    // navigate("/food/${params.foodId}");
  };

  const handleImgDeleteOnClick = (index) => {
    setFiles(files.filter((file, i) => i !== index));
  };

  return (
    <>
      <div css={s.layout}>
        <div css={s.foodContainer}>
          <div css={s.foodImgContainer}>
            {/* 여러장일수도 있어서 슬라이드 처리해야됨 */}
            <img
              src={`${baseURL}/upload/food/${foodDetail?.foodImgs[0].imgPath}`}
              alt=""
            />
          </div>
          <div css={s.contentContainer}>
            <div css={s.contentLayout}>
              <span>{foodDetail?.foodCategory?.foodCategoryName}</span>
              <div css={s.contentTitle}>
                <span>{foodDetail?.title}</span>
                <div>
                  {false ? (
                    <img src={like} alt="" />
                  ) : (
                    <img src={unlike} alt="" />
                  )}
                </div>
              </div>
              <div css={s.contentUser}>
                <span>??개의 상품후기가 있어요!</span>
                <span>{foodDetail?.user?.name}</span>
              </div>
            </div>
            <div css={s.foodPrice}>
              <span>{foodDetail?.price.toLocaleString()}원</span>
              <button>바로구매</button>
            </div>
          </div>
        </div>
        <div css={s.commentsRegister}>
          <div css={s.imgListContainer}>
            {/* 이미지파일 등록 */}
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
          <div css={s.buttonLayout}>
            <button css={s.registerButton} onClick={handleRegisterOnClick}>
              등록하기
            </button>
          </div>
        </div>
        <div css={s.commentsContainer}></div>
      </div>
      <Footer />
    </>
  );
}

export default FoodDetail;
