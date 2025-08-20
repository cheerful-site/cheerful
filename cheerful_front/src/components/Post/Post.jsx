/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import noImage from "../../icons/Frame2.png";
import { AiFillLike } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { reqCommunityViews } from "../../api/communityApi/communityApi";
import { PiEyesFill } from "react-icons/pi";
import { baseURL } from "../../api/axios/axios";
import { reqNoticeViews } from "../../api/noticeApi/noticeApi";

function Post({ content, category }) {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(content);
  // console.log(location.pathname);

  const handleOnClick = () => {
    if (location.pathname.startsWith("/notice")) {
      reqNoticeViews(category, content.noticeId);
      navigate(`/notice/${category}/${content.notice}`);
    } else {
      reqCommunityViews(category, content.communityId);
      navigate(`/community/${category}/${content.communityId}`);
    }
  };

  return (
    <div css={s.postLayout}>
      {location.pathname.startsWith("/notice") ? (
        <img
          css={s.postImg}
          src={
            content?.noticeImgs?.lenght > 0
              ? `${baseURL}/upload${content?.noticeImgs[0]?.imgPath}`
              : noImage
          }
          alt=""
        />
      ) : (
        <img
          css={s.postImg}
          src={
            content?.communityImgs?.lenght > 0
              ? `${baseURL}/upload${content?.communityImgs[0]?.imgPath}`
              : noImage
          }
          alt=""
          onClick={handleOnClick}
        />
      )}

      <div css={s.postContainer}>
        <div css={s.postTitle} onClick={handleOnClick}>
          {content.title}
        </div>
        <div css={s.postContent}>
          <p>{content.content}</p>
        </div>
        <div css={s.postLike}>
          <div>
            <span>{content.user.name}</span>
          </div>
          <div css={s.likeAndViews}>
            <div>
              <AiFillLike />
              <span>{content.likeCount}</span>
            </div>
            <div>
              <PiEyesFill />
              <span>{content.views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
