/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCommunityDetailQuery from "../../../queries/CommunityQuery/useCommunityDetail";
import Footer from "../../../components/Footer/Footer";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import { baseURL } from "../../../api/axios/axios";
import { FaRegComment } from "react-icons/fa";
import { reqCommunityRegisterComments } from "../../../api/communityApi/communityApi";

function CommunityDetail(props) {
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
  const [isOpen, setIsOpen] = useState(false);

  const detailContent = communityDetail?.data?.data?.body;
  const comments = communityDetail?.data?.data?.body?.communityComments;
  const user = principal?.data?.data?.body?.user || [];

  // console.log(user);
  // console.log(detailContent);
  // console.log(comments);

  const handleCommentOnChange = (e) => {
    setCommentInputValue(e.target.value);
    // if (!/^@\w+\s/.test(e.target.value)) {
    //   setRecomment(null);
    // }
  };

  const handleCommentsOnClick = () => {
    const content = /^@\w+\s/.test(commentInputValue)
      ? commentInputValue.substring(commentInputValue.indexOf(" ") + 1)
      : commentInputValue;

    const comment = {
      communityId: detailContent?.communityId,
      content,
    };

    reqCommunityRegisterComments(comment);
    communityDetail.refetch();
  };

  const handleOpenRecommentOnClick = (comment, commentId) => {
    setRecomment(comment);

    if (openCommentId === commentId) {
      setOpenCommentId(null);
    } else {
      setOpenCommentId(commentId);
    }
  };

  const handleRecommentsOnClick = () => {
    const content = /^@\w+\s/.test(commentInputValue)
      ? commentInputValue.substring(commentInputValue.indexOf(" ") + 1)
      : commentInputValue;

    const comment = {
      communityId: recomment?.communityId,
      parentCommentId: recomment?.communityCommentId,
      parentUserId: recomment?.userId,
      content,
    };

    reqCommunityRegisterComments(comment);
    communityDetail.refetch();
    setOpenCommentId(null);
  };

  console.log(detailContent);
  // console.log(recomment);

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
                <span>{detailContent?.title}</span>
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
              <span>공감해요 {detailContent?.likeCount}</span>
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
                            <img src={comment?.user?.profileImgUrl} alt="" />
                            <span>{comment?.user?.name}</span>
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
                          <img src={comment?.user?.profileImgUrl} alt="" />
                          <span>{comment?.user?.name}</span>
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
