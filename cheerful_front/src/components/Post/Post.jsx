/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import noImage from "../../icons/Frame2.png";
import { AiFillLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { reqCommunityViews } from "../../api/communityApi/communityApi";
import { PiEyesFill } from "react-icons/pi";
import { baseURL } from "../../api/axios/axios";

function Post({ content, category }) {
  const navigate = useNavigate();
  // console.log(content);

  const handleOnClick = () => {
    reqCommunityViews(category, content.communityId);
    navigate(`/community/${category}/${content.communityId}`);
  };

  return (
    <div css={s.postLayout}>
      <img
        css={s.postImg}
        src={
          content?.communityImgs[0]?.imgPath
            ? `${baseURL}/upload${content?.communityImgs[0]?.imgPath}`
            : noImage
        }
        alt=""
        onClick={handleOnClick}
      />

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
