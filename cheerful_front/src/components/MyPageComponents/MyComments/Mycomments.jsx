/**@jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import useMyPageComment from "../../../queries/MyPageQuery/useMyPageComment";
import PageNation from "../../PageNation/PageNation";
import { Link, useNavigate } from "react-router-dom";

function MyComments(props) {
  const navegate = useNavigate();
  const [page, setPage] = useState(1);
  const myComment = useMyPageComment(page, 3);
  const myComments = myComment?.data?.data?.body;
  console.log(myComments);

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div>내가 쓴 댓글</div>
        {myComments?.content.length === 0 ? (
          <div css={s.notComment}>아직 작성한 댓글이 없습니다.</div>
        ) : (
          <>
            {myComments?.content?.map((comment) => (
              <div key={comment?.commentId} css={s.commentContainer}>
                <div>
                  {comment?.type} {" > "} {comment?.parentCategoryName}
                </div>
                {comment?.type === "COMMUNITY" ? (
                  <Link
                    to={`/${comment?.type.toLowerCase()}/1/${
                      comment?.parentId
                    }`}>
                    <div>{comment?.parentTitle}</div>
                  </Link>
                ) : (
                  <Link
                    to={`/${comment?.type.toLowerCase()}/${comment?.parentId}`}>
                    <div>{comment?.parentTitle}</div>
                  </Link>
                )}

                <div>{comment?.content}</div>
                <div>{comment?.createdAt.slice(0, 10)}</div>
              </div>
            ))}
          </>
        )}
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
