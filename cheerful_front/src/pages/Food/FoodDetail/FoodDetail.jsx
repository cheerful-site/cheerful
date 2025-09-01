/**@jsxImportSource @emotion/react */
import { Link, useParams } from "react-router-dom";
import useFoodDetailQuery from "../../../queries/FoodQuery/useFoodDetailQuery";
import * as s from "./styles";
import like from "../../../../logo/cheerful_like.png";
import unlike from "../../../../logo/cheerful_unlike.png";
import Footer from "../../../components/Footer/Footer";
import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import {
  reqFoodCommentDislike,
  reqFoodCommentLike,
  reqFoodDislike,
  reqFoodLike,
  reqFoodRegisterComment,
  reqUserDeleteFoodComment,
} from "../../../api/foodApi/foodApi";
import { useQueryClient } from "@tanstack/react-query";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import { reqAdminFoodCommentDelete } from "../../../api/adminApi/adminApi";

function FoodDetail(props) {
  const params = useParams();
  const token = localStorage.getItem("AccessToken");
  const principal = usePrincipalQuery();
  const queryClient = useQueryClient();
  const [files, setFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const food = useFoodDetailQuery(params.foodId);
  const foodDetail = food?.data?.data?.body;
  const user = principal?.data?.data.body.user || [];
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
    setInputValue(e.target.value);
  };

  const handleImgDeleteOnClick = (index) => {
    setFiles(files.filter((file, i) => i !== index));
  };

  const handleRegisterOnClick = async () => {
    const formData = new FormData();
    if (confirm("댓글을 등록하시겠습니까?")) {
      try {
        formData.append("content", inputValue);
        files.forEach((f) => formData.append("files", f.file));

        // for (let pair of formData.entries()) {
        //   console.log(pair[0], pair[1]);
        // }

        await reqFoodRegisterComment(formData, foodDetail?.foodId);
        setInputValue("");
        await food.refetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLikeOnClick = (foodId) => {
    // console.log(queryClient.setQueriesData());
    // console.log(["foodDetail", foodId]);
    // console.log(queryClient.setQueryData(["foodDetail", foodId]));

    if (!!token) {
      reqFoodLike(foodId).then((response) => {
        queryClient.setQueryData(["foodDetail", foodId], (prev) => {
          return {
            ...prev,
            data: {
              ...prev.data,
              body: {
                ...prev.data.body,
                isLike: 1,
                likeCount: prev.data.body.likeCount + 1,
              },
            },
          };
        });
      });
    } else {
      alert("로그인 후 이용해 주세요.");
    }
  };

  const handleDislikeOnClick = (foodId) => {
    // console.log(queryClient.setQueriesData());
    // console.log(["foodDetail", foodId]);
    // console.log(queryClient.setQueryData(["foodDetail", foodId]));

    if (!!token) {
      reqFoodDislike(foodId).then((response) => {
        queryClient.setQueryData(["foodDetail", foodId], (prev) => {
          return {
            ...prev,
            data: {
              ...prev.data,
              body: {
                ...prev.data.body,
                isLike: 0,
                likeCount: prev.data.body.likeCount - 1,
              },
            },
          };
        });
      });
    } else {
      alert("로그인 후 이용해 주세요.");
    }
  };

  const handleCommentLikeOnClick = (foodId, foodCommentId) => {
    if (!!token) {
      reqFoodCommentLike(foodId, foodCommentId).then((response) => {
        queryClient.setQueryData(["foodDetail", foodId], (prev) => {
          return {
            ...prev,
            data: {
              ...prev.data,
              body: {
                ...prev.data.body,
                foodComment: prev.data.body.foodComment.map((comment) => {
                  console.log(comment?.foodCommentId === Number(foodCommentId));
                  if (comment.foodCommentId === Number(foodCommentId)) {
                    return {
                      ...comment,
                      isLike: 1,
                      likeCount: comment.likeCount + 1,
                    };
                  }
                  return comment;
                }),
              },
            },
          };
        });
      });
    } else {
      alert("로그인 후 이용해 주세요");
    }
  };

  const handleCommentDislikeOnClick = (foodId, foodCommentId) => {
    if (!!token) {
      reqFoodCommentDislike(foodId, foodCommentId).then((response) => {
        queryClient.setQueryData(["foodDetail", foodId], (prev) => {
          return {
            ...prev,
            data: {
              ...prev.data,
              body: {
                ...prev.data.body,
                foodComment: prev.data.body.foodComment.map((comment) => {
                  console.log(comment?.foodCommentId === Number(foodCommentId));
                  if (comment.foodCommentId === Number(foodCommentId)) {
                    return {
                      ...comment,
                      isLike: 0,
                      likeCount: comment.likeCount - 1,
                    };
                  }
                  return comment;
                }),
              },
            },
          };
        });
      });
    } else {
      alert("로그인 후 이용해 주세요");
    }
  };

  const handleCommentDeleteOnClick = async (commentId, userId) => {
    console.log(commentId, userId);
    if (confirm("댓글을 삭제하시겠습니까?")) {
      if (user?.role === "ROLE_ADMIN") {
        try {
          await reqAdminFoodCommentDelete(commentId);
          alert("댓글이 삭제되었습니다.");
          food.refetch();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await reqUserDeleteFoodComment(commentId, userId);
          alert("댓글이 삭제되었습니다.");
          food.refetch();
        } catch (error) {
          console.log(error);
        }
      }
    }
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
                  {foodDetail?.isLike === 0 ? (
                    <img
                      src={unlike}
                      onClick={() =>
                        handleLikeOnClick(foodDetail?.foodId.toString())
                      }
                    />
                  ) : (
                    <img
                      src={like}
                      onClick={() =>
                        handleDislikeOnClick(foodDetail?.foodId.toString())
                      }
                    />
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
              <Link
                to={foodDetail?.foodAddress}
                target="_blank"
                rel="noopener noreferrer">
                <button>바로구매</button>
              </Link>
            </div>
          </div>
        </div>
        {token ? (
          <div css={s.commentsRegister}>
            {/* 댓글 등록하기 */}
            <span>{user?.name}</span>
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
          {foodDetail?.foodComment?.map((comment, index) => (
            <div key={index} css={s.commentContainer}>
              <div css={s.commentUser}>
                <div>
                  <img src={comment?.user.profileImgUrl} alt="" />
                  <span>{comment?.user.name}</span>
                </div>
                {user?.role === "ROLE_ADMIN" ||
                user?.userId === comment?.user?.userId ? (
                  <div>
                    <button
                      onClick={() =>
                        handleCommentDeleteOnClick(
                          comment?.foodCommentId,
                          user?.userId
                        )
                      }>
                      삭제
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div css={s.imgAndContent}>
                <div>
                  <span>{foodDetail?.title}</span>
                  <span>{comment?.createdAt.slice(0, 10)}</span>
                </div>
                {comment?.foodCommentImgs.length === 0 ? (
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
                <div css={s.likeSelected}>
                  <span>이 후기가 도움이 돼요!</span>
                  {comment?.isLike === 0 ? (
                    <div
                      css={s.dislike}
                      onClick={() =>
                        handleCommentLikeOnClick(
                          comment?.foodId.toString(),
                          comment?.foodCommentId.toString()
                        )
                      }>
                      <AiOutlineLike />
                      <span>{comment?.likeCount}</span>
                    </div>
                  ) : (
                    <div
                      css={s.like}
                      onClick={() =>
                        handleCommentDislikeOnClick(
                          comment?.foodId.toString(),
                          comment?.foodCommentId.toString()
                        )
                      }>
                      <AiFillLike />
                      <span>{comment?.likeCount}</span>
                    </div>
                  )}
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
