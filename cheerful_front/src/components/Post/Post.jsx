/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import noImage from "../../icons/Frame2.png";
import { AiFillLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Post({ content, category }) {
  const navigate = useNavigate();
  console.log(content);

  const handleOnClick = () => {
    navigate(`/community/${category}/${content.communityId}`);
  };

  return (
    <div css={s.postLayout}>
      <img
        css={s.postImg}
        src={
          content.communityImgs[0]?.imgPath
            ? content.communityImgs[0].imgPath
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
            <span>{content.user.username}</span>
            <span>{content.createdAt.slice(0, 10)}</span>
          </div>
          <div>
            <AiFillLike />
            <span>{content.likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
