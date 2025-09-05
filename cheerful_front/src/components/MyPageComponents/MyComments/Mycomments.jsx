/**@jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import useMyPageComment from "../../../queries/MyPageQuery/useMyPageComment";
import PageNation from "../../PageNation/PageNation";

function MyComments(props) {
  const [page, setPage] = useState(1);
  const myComment = useMyPageComment(page, 3);
  const myComments = myComment?.data?.data?.body;

  console.log(myComments);

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div>내가 쓴 댓글</div>
        {myComments?.content?.map((comment) => (
          <div key={comment?.commentId} css={s.commentContainer}>
            <div>
              {comment?.type} {">"} {comment?.parentCategoryName}
            </div>
            <div>{comment?.parentTitle}</div>
            <div>{comment?.content}</div>
            <div>{comment?.createdAt.slice(0, 10)}</div>
          </div>
        ))}
      </div>
      <PageNation
        page={page}
        setPage={setPage}
        size={myComments?.size}
        totalElements={myComments?.totalElements}
      />
    </div>
  );
}

export default MyComments;
