/**@jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import useMyPageComment from "../../../queries/MyPageQuery/useMyPageComment";

function MyComments(props) {
  const [page, setPage] = useState(1);
  const myComments = useMyPageComment(1, 3);

  console.log(myComments?.data?.data?.body);

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div>내가 쓴 댓글</div>
        {myComments?.content?.map((comment) => (
          <div key={comment?.commentId} css={s.commentContainer}>
            <div>
              {comment?.type} {comment?.parentCategoryName}
            </div>
            <div>{comment?.parentTitle}</div>
            <div>{comment?.content}</div>
            <div>{comment?.createdAt.slice(0, 10)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyComments;
