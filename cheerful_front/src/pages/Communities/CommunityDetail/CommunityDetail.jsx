/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCommunityDetailQuery from "../../../queries/CommunityQuery/useCommunityDetail";
import Footer from "../../../components/Footer/Footer";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import { baseURL } from "../../../api/axios/axios";
import { FaRegComment } from "react-icons/fa";

function CommunityDetail(props) {
  const params = useParams();
  const principal = usePrincipalQuery();
  const token = localStorage.getItem("AccessToken");
  const communityDetail = useCommunityDetailQuery(
    params.category,
    params.communityId
  );
  const [inputValue, setInputValue] = useState();

  const detailContent = communityDetail?.data?.data?.body;
  const comments = communityDetail?.data?.data?.body?.communityComments;
  const user = principal?.data?.data?.body?.user || [];
  // console.log(user);
  // console.log(detailContent);
  // console.log(comments);

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleCommentsOnClick = () => {
    console.log(inputValue);
  };

  const handleRecommentRegisterOnClick = () => {};

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
              {detailContent?.communityImgs ? (
                detailContent?.communityImgs?.map((img, index) => (
                  <img
                    key={index}
                    src={`${baseURL}/upload${img.imgPath}`}
                    alt=""
                  />
                ))
              ) : (
                <></>
              )}
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
                      onChange={handleOnChange}
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
                {comments?.map((comment) => {
                  if (comment.level === 0) {
                    return (
                      <>
                        <div css={s.commentUser}>
                          <img src={comment?.user?.profileImgPath} alt="" />
                          <span>{comment?.user?.name}</span>
                        </div>
                        <div css={s.commentContent}>
                          <span>{comment.content}</span>
                          <div>
                            <span>{comment.createdAt.slice(0, 10)}</span>
                            <span>{comment.createdAt.slice(11, 16)}</span>
                            <span onClick={handleRecommentRegisterOnClick}>
                              답글달기 <FaRegComment />
                            </span>
                          </div>
                        </div>
                      </>
                    );
                  }
                  return (
                    <div css={s.subComments}>
                      <div css={s.commentUser}>
                        <img src={comment?.user?.profileImgPath} alt="" />
                        <span>{comment?.user?.name}</span>
                      </div>
                      <div css={s.commentContent}>
                        <span>{comment.content}</span>
                        <div>
                          <span>{comment.createdAt.slice(0, 10)}</span>
                          <span>{comment.createdAt.slice(11, 16)}</span>
                          <span>
                            답글달기{" "}
                            <FaRegComment
                              onClick={handleRecommentRegisterOnClick}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
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
