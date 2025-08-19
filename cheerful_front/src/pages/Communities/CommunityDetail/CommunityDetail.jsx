/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCommunityDetailQuery from "../../../queries/CommunityQuery/useCommunityDetail";
import Footer from "../../../components/Footer/Footer";
import usePrincipalQuery from "../../../queries/PrincipalQuery/usePrincipalQuery";
import { baseURL } from "../../../api/axios/axios";

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
  const user = principal?.data?.data?.body?.user || [];
  // console.log(user);
  console.log(detailContent);

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleCommentsOnClick = () => {
    console.log(inputValue);
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
                <span>{detailContent?.title}</span>
                <div>
                  <span>{detailContent?.user.name}</span>
                  <span>{detailContent?.createdAt.slice(0, 10)}</span>
                </div>
              </div>
              <div>{detailContent?.content}</div>
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
                <div css={s.commentContainer}>
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
                  <div>댓글 {detailContent?.communityComments.length}</div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CommunityDetail;
