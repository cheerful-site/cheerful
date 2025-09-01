/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useCommunityDetailQuery from "../../../queries/CommunityQuery/useCommunityDetail";
import Footer from "../../../components/Footer/Footer";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import { FaRegComment } from "react-icons/fa";
import {
  reqCommunitydisLike,
  reqCommunityLike,
  reqCommunityRegisterComments,
  reqUserDeleteCommunityComment,
  reqUserDeleteCommunityPost,
} from "../../../api/communityApi/communityApi";
import { useQueryClient } from "@tanstack/react-query";
import {
  reqAdminDeleteCommentCommunity,
  reqAdminOneDeleteCommunity,
} from "../../../api/adminApi/adminApi";

function CommunityDetail(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const params = useParams();
  const principal = usePrincipalQuery();
  const token = localStorage.getItem("AccessToken");
  const communityDetail = useCommunityDetailQuery(
    params.category,
    params.communityId
  );

  const [commentInputValue, setCommentInputValue] = useState();
  const [recomment, setRecomment] = useState(null);
  const [openCommentId, setOpenCommentId] = useState(null);

  const detailContent = communityDetail?.data?.data?.body;
  const comments = communityDetail?.data?.data?.body?.communityComments;
  const user = principal?.data?.data?.body?.user || [];

  // console.log(principal?.data?.data?.body?.user);
  // console.log(detailContent);
  // console.log(comments);

  const handleCommentOnChange = (e) => {
    setCommentInputValue(e.target.value);
  };

  const handleCommentsOnClick = async () => {
    const content = /^@\w+\s/.test(commentInputValue)
      ? commentInputValue.substring(commentInputValue.indexOf(" ") + 1)
      : commentInputValue;

    const comment = {
      communityId: detailContent?.communityId,
      content,
    };

    await reqCommunityRegisterComments(comment);
    setCommentInputValue("");
    communityDetail.refetch();
  };

  const handleOpenRecommentOnClick = (comment, commentId) => {
    setRecomment(comment);
    if (!token) {
      alert("로그인 후 이용해 주세요");
    } else {
      if (openCommentId === commentId) {
        setOpenCommentId(null);
      } else {
        setOpenCommentId(commentId);
      }
    }
  };

  const handleRecommentsOnClick = async () => {
    const content = /^@\w+\s/.test(commentInputValue)
      ? commentInputValue.substring(commentInputValue.indexOf(" ") + 1)
      : commentInputValue;

    const comment = {
      communityId: recomment?.communityId,
      parentCommentId: recomment?.communityCommentId,
      parentUserId: recomment?.userId,
      content,
    };

    await reqCommunityRegisterComments(comment);
    await communityDetail.refetch();
    setCommentInputValue("");
    setOpenCommentId(null);
  };

  const handleLikeOnClick = (categoryId, communityId) => {
    if (!!token) {
      reqCommunityLike(communityId).then((response) => {
        queryClient.setQueryData(
          ["communityDetail", categoryId, communityId],
          (prev) => {
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
          }
        );
      });
    } else {
      alert("로그인 후 이용해 주세요.");
    }
  };

  const handleDislikeOnClick = (categoryId, communityId) => {
    if (!!token) {
      reqCommunitydisLike(communityId).then((response) => {
        queryClient.setQueryData(
          ["communityDetail", categoryId, communityId],
          (prev) => {
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
          }
        );
      });
    } else {
      alert("로그인 후 이용해 주세요.");
    }
  };

  const handlePostDeleteOnClick = async (communityId, userId) => {
    // console.log(communityId);
    if (confirm("게시글을 삭제하시겠습니까?")) {
      if (user?.role === "ROLE_ADMIN") {
        try {
          await reqAdminOneDeleteCommunity(communityId);
          alert("게시글이 삭제되었습니다.");
          navigate("/community/1");
          communityDetail.refetch();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await reqUserDeleteCommunityPost(communityId, userId);
          communityDetail.refetch();
          alert("게시글이 삭제되었습니다.");
          navigate("/community/1");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleCommentDeleteOnClick = async (commentId, userId) => {
    console.log(commentId, userId);
    if (confirm("댓글을 삭제하시겠습니까?")) {
      if (user?.role === "ROLE_ADMIN") {
        try {
          reqAdminDeleteCommentCommunity(commentId);
          communityDetail.refetch();
          alert("댓글이 삭제되었습니다.");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          reqUserDeleteCommunityComment(commentId, userId);
          communityDetail.refetch();
          alert("댓글이 삭제되었습니다.");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <div css={s.layout}>
        <div>
          <div css={s.categoryContainer}>
            {/* categoryname */}
            <span>커뮤니티</span>
            <span> &gt; </span>
            <span>
              {detailContent?.communityCategory?.communityCategoryName}
            </span>
          </div>
          <div css={s.postContainer}>
            <div css={s.content}>
              <div css={s.contentTitle}>
                <div>
                  <span>{detailContent?.title}</span>
                  {user?.role === "ROLE_ADMIN" ||
                  user?.userId === detailContent?.user?.userId ? (
                    <button
                      onClick={() =>
                        handlePostDeleteOnClick(
                          detailContent?.communityId,
                          user?.userId
                        )
                      }>
                      삭제
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <span>{detailContent?.user.name}</span>
                  <span>{detailContent?.createdAt.slice(0, 10)}</span>
                </div>
              </div>
              <div css={s.contentContainer}>{detailContent?.content}</div>
              {detailContent?.communityImgs?.map((img, index) => (
                <img key={index} src={img.imgUrl} alt="" />
              ))}
            </div>

            <div css={s.postLike}>
              {detailContent?.isLike === 0 ? (
                <span
                  css={s.isDislike}
                  onClick={() =>
                    handleLikeOnClick(
                      detailContent?.communityCategoryId.toString(),
                      detailContent?.communityId.toString()
                    )
                  }>
                  공감해요 {detailContent?.likeCount}
                </span>
              ) : (
                <span
                  css={s.isLike}
                  onClick={() =>
                    handleDislikeOnClick(
                      detailContent?.communityCategoryId.toString(),
                      detailContent?.communityId.toString()
                    )
                  }>
                  공감해요 {detailContent?.likeCount}
                </span>
              )}
            </div>
            {token ? (
              <>
                <div css={s.commentRegisterContainer}>
                  <div css={s.commentRegister}>
                    <span>{user?.name}</span>
                    <textarea
                      name="comment"
                      id=""
                      placeholder="댓글을 남겨주세요..."
                      onChange={handleCommentOnChange}
                      value={commentInputValue}
                    />
                    <div>
                      <button onClick={handleCommentsOnClick}>등록하기</button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            <div css={s.commentsLayout}>
              <div>댓글 {detailContent?.communityComments.length}</div>
              <div css={s.commentsContainer}>
                {comments?.map((comment, index) => {
                  if (comment.level === 0) {
                    return (
                      <div key={index}>
                        <div>
                          <div css={s.commentUser}>
                            <div>
                              <img src={comment?.user?.profileImgUrl} alt="" />
                              <span>{comment?.user?.name}</span>
                            </div>
                            <div>
                              {user?.role === "ROLE_ADMIN" ||
                              user?.userId === comment?.userId ? (
                                <button
                                  onClick={() =>
                                    handleCommentDeleteOnClick(
                                      comment?.communityCommentId,
                                      user?.userId
                                    )
                                  }>
                                  삭제
                                </button>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <div css={s.commentContent}>
                            <span>{comment.content}</span>
                            <div>
                              <span>{comment.createdAt.slice(0, 10)}</span>
                              <span>{comment.createdAt.slice(11, 16)}</span>
                              <span
                                onClick={() =>
                                  handleOpenRecommentOnClick(
                                    comment,
                                    comment?.communityCommentId
                                  )
                                }>
                                답글달기 <FaRegComment />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* ////  대댓글 Input  //// */}
                        {openCommentId === comment?.communityCommentId && (
                          <div>
                            <div css={s.commentRegisterContainer}>
                              <div css={s.recommentRegister}>
                                <span>{user?.name}</span>
                                <textarea
                                  name="comment"
                                  placeholder="댓글을 남겨주세요..."
                                  onChange={handleCommentOnChange}
                                  value={commentInputValue}
                                />
                                <div>
                                  <button onClick={handleRecommentsOnClick}>
                                    등록하기
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <>
                      <div css={s.subComments}>
                        <div css={s.commentUser}>
                          <div>
                            <img src={comment?.user?.profileImgUrl} alt="" />
                            <span>{comment?.user?.name}</span>
                          </div>
                          <div>
                            {user?.role === "ROLE_ADMIN" ||
                            user?.userId === comment?.userId ? (
                              <button
                                css={s.recomments}
                                onClick={() =>
                                  handleCommentDeleteOnClick(
                                    comment?.communityCommentId,
                                    user?.userId
                                  )
                                }>
                                삭제
                              </button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        <div css={s.commentContent}>
                          <span>{comment.content}</span>
                          <div>
                            <span>{comment.createdAt.slice(0, 10)}</span>
                            <span>{comment.createdAt.slice(11, 16)}</span>
                            <span
                              onClick={() =>
                                handleOpenRecommentOnClick(
                                  comment,
                                  comment?.communityCommentId
                                )
                              }>
                              답글달기
                              <FaRegComment />
                            </span>
                          </div>
                        </div>
                      </div>
                      {openCommentId === comment?.communityCommentId && (
                        <div>
                          <div css={s.commentRegisterContainer}>
                            <div css={s.recommentRegister}>
                              <span>{user?.name}</span>
                              <textarea
                                name="comment"
                                placeholder="댓글을 남겨주세요..."
                                onChange={handleCommentOnChange}
                                value={commentInputValue}
                              />
                              <div>
                                <button onClick={handleRecommentsOnClick}>
                                  등록하기
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CommunityDetail;
