/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import useMyPageCommunity from "../../../queries/MyPageQuery/useMyPageCommunity";
import PageNation from "../../PageNation/PageNation";
import { useState } from "react";

function MyPost(props) {
  const [page, setPage] = useState(1);
  const myCommunity = useMyPageCommunity(page, 5);
  const myCommunityPost = myCommunity?.data?.data?.body;
  // console.log(myCommunityPost);

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div>내가 쓴 글</div>

        <table css={s.tableContainer}>
          <thead>
            <tr css={s.headerContainer}>
              <td>카테고리</td>
              <td>제목</td>
              <td>작성일</td>
              <td>좋아요</td>
              <td>조회</td>
            </tr>
          </thead>
          <tbody css={s.tbodyContainer}>
            {myCommunityPost?.content?.map((post) => (
              <tr key={post.communityId} css={s.bodyContainer}>
                <td>{post?.categoryName}</td>
                <td>{post?.title}</td>
                <td>{post?.createdAt.slice(0, 10)}</td>
                <td>{post?.likeCount}</td>
                <td>{post?.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <PageNation
          page={page}
          setPage={setPage}
          size={myCommunity?.size}
          totalElements={myCommunity?.totalElements}
        />
      </div>
    </div>
  );
}

export default MyPost;
