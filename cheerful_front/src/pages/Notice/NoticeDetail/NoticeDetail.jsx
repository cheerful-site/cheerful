/**@jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import useNoticeDetailQuery from "../../../queries/NoticeQuery/useNoticeDetailQuery";
import * as s from "./styles";
import Footer from "../../../components/Footer/Footer";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { reqNoticeRegisterComment } from "../../../api/noticeApi/noticeApi";
import noImage from "../../../../logo/logo__2.png";

function NoticeDetail(props) {
  const params = useParams();
  const notice = useNoticeDetailQuery(params.category, params.noticeId);
  const token = localStorage.getItem("AccessToken");
  const queryClient = useQueryClient();
  const [files, setFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const detailContent = notice?.data?.data?.body;

  // console.log(detailContent);
  // console.log(detailContent?.noticeImgs);

  console.log(detailContent);

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
    setInputValue(e.target.value);
  };

  const handleImgDeleteOnClick = (index) => {
    setFiles(files.filter((file, i) => i !== index));
  };

  const handleLikeOnClick = () => {};
  const handleDislikeOnClick = () => {};

  const handleRegisterOnClick = () => {
    const formData = new FormData();

    formData.append("content", inputValue);
    files.forEach((f) => formData.append("files", f.file));

    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    reqNoticeRegisterComment(formData, detailContent?.noticeId);
    setInputValue("");
    notice.refetch();
  };

  return (
    <div css={s.layout}>
      <div>
        <div css={s.categoryContainer}>
          {/* categoryname */}
          <span>커뮤니티</span>
          <span> &gt; </span>
          <span>{detailContent?.noticeCategory?.noticeCategoryName}</span>
        </div>
        <div css={s.postContainer}>
          <div css={s.content}>
            <div css={s.contentTitle}>
              <span>{detailContent?.title}</span>
              <div>
                <span>{detailContent?.user.name}</span>
                <span>{detailContent?.createdAt.slice(0, 10)}</span>
              </div>
            </div>
            <div css={s.contentContainer}>{detailContent?.content}</div>
            {detailContent?.noticeImgs ? (
              detailContent?.noticeImgs?.map((img, index) => (
                <img key={index} src={img.imgUrl} alt="" />
              ))
            ) : (
              <></>
            )}
          </div>

          <div css={s.postLike}>
            {detailContent?.isLike === 0 ? (
              <span
                css={s.isDislike}
                onClick={() =>
                  handleLikeOnClick(detailContent?.noticeId.toString())
                }>
                공감해요 {detailContent?.likeCount}
              </span>
            ) : (
              <span
                css={s.isLike}
                onClick={() =>
                  handleDislikeOnClick(detailContent?.noticeId.toString())
                }>
                공감해요 {detailContent?.likeCount}
              </span>
            )}
          </div>
        </div>
        {token && detailContent?.noticeCategoryId === 3 ? (
          <div css={s.commentsRegister}>
            {/* 댓글 등록하기 */}
            <span>{detailContent?.user?.name}</span>
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
                value={inputValue}
                placeholder="내용을 작성해 주세요. (최소 5자)"
              />
            </div>
            <div css={s.buttonLayout}>
              <button css={s.registerButton} onClick={handleRegisterOnClick}>
                등록하기
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div css={s.commentsContainer}>
          {/* commentView */}
          {detailContent?.noticeComment?.map((comment) => (
            <div key={comment.foodCommentId} css={s.commentContainer}>
              <div css={s.commentUser}>
                <img src={noImage} alt="" />
                <span>{comment?.userId}</span>
              </div>
              <div css={s.imgAndContent}>
                <div>
                  <span>{detailContent?.title}</span>
                  <span>{comment?.createdAt.slice(0, 10)}</span>
                </div>
                {comment?.noticeCommentImgs === null ? (
                  <></>
                ) : (
                  <div css={s.commentImgList}>
                    {comment?.foodCommentImgs?.map((img, index) => (
                      <img key={index} src={img.imgUrl} alt="" />
                    ))}
                  </div>
                )}
                <div>
                  <p>{comment?.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NoticeDetail;
