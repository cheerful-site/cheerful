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
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

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

  const handleImgDeleteOnClick = (index) => {
    setFiles(files.filter((file, i) => i !== index));
  };

  const handleRegisterOnClick = () => {
    const formData = new FormData();
    formData.append("content", inputValue.content);
    files.forEach((f) => formData.append("files", f.file));
    // console.log(formData);
    // navigate("/food/${params.foodId}");
  };

  return (
    <>
      <div css={s.layout}>
        <div css={s.foodContainer}>
          <div css={s.foodImgContainer}>
            {/* 여러장일수도 있어서 슬라이드 처리해야됨 */}
            <img src={`${foodDetail?.foodImgs[0]?.imgUrl}`} alt="" />
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
                <span>
                  {foodDetail?.foodComment.length}개의 상품후기가 있어요!
                </span>
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
          {/* 댓글 등록하기 */}
          <span>{foodDetail?.user?.name}</span>
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
        <div css={s.commentsContainer}>
          {/* commentView */}
          {foodDetail?.foodComment?.map((comment) => (
            <div key={comment.foodCommentId} css={s.commentContainer}>
              <div css={s.commentUser}>
                <img src={comment?.user.profileImgUrl} alt="" />
                <span>{comment?.user.name}</span>
              </div>
              <div css={s.imgAndContent}>
                <div>
                  <span>{foodDetail?.title}</span>
                  <span>{comment?.createdAt.slice(0, 10)}</span>
                </div>
                <div css={s.commentImgList}>
                  {comment?.foodCommentImgs?.map((img) => (
                    <img src={img.imgUrl} alt="" />
                  ))}
                </div>
                <div>
                  <p>{comment?.content}</p>
                </div>
                <div css={s.likeSelected}>
                  <span>이 후기가 도움이 되요!</span>
                  <div>
                    <AiFillLike />
                    <span>{comment?.isLike}</span>
                  </div>
                  {/* <AiOutlineLike /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FoodDetail;
