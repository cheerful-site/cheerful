/**@jsxImportSource @emotion/react */
import { Link, useNavigate, useParams } from "react-router-dom";
import * as s from "./styles";
import { useEffect, useState } from "react";
import Footer from "../../../components/Footer/Footer";
import useNoticeListQuery from "../../../queries/NoticeQuery/useNoticeListQuery";
import CategoryComponent from "../../../components/CategoryComponent/CategoryComponent";
import PageNation from "../../../components/PageNation/PageNation";
import { reqNoticeViews } from "../../../api/noticeApi/noticeApi";
import Post from "../../../components/Post/Post";
import Loading from "../../../components/Loading/Loading";

function Notice(props) {
  const { category } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const notice = useNoticeListQuery(page, 10, parseInt(category));
  const noticePages = notice?.data?.data?.body;
  const noticeList = notice?.data?.data?.body?.content;

  // console.log(noticeList);

  const noticeCategory = [
    { id: 1, title: "공지사항", category: 1 },
    { id: 2, title: "매거진", category: 2 },
    { id: 3, title: "이벤트", category: 3 },
  ];

  useEffect(() => {
    setPage(1);
  }, [category]);

  const handleOnClick = (categoryId, noticeId) => {
    console.log(categoryId, noticeId);
    reqNoticeViews(categoryId, noticeId);
    navigate(`/notice/${categoryId}/${noticeId}`);
  };

  return (
    <div css={s.layout}>
      {notice.isLoading && <Loading />}
      <div css={s.noticeTitle}>
        <div>
          우리 커뮤니티의 <span>똥꼬발랄한 소식</span>들, 다 여기 있어요!
        </div>
        <div>지금, 무슨 일이 일어나고 있을까요?</div>
      </div>

      <div css={s.categoryList}>
        {noticeCategory.map((cate) => (
          <CategoryComponent
            key={cate.id}
            cate={cate}
            category={category}
            route={"notice"}
          />
        ))}
      </div>

      <div css={s.noticePostContainer}>
        {parseInt(category) === 1
          ? noticeList?.map((post) => (
              <div key={post.noticeId} css={s.noticePost}>
                <div
                  onClick={() =>
                    handleOnClick(post.noticeCategoryId, post.noticeId)
                  }>
                  {post.title}
                </div>
                <div css={s.noticeAuthor}>
                  <span>{post?.user.name}</span>
                  <span>{post.createdAt.substring(0, 10)}</span>
                </div>
              </div>
            ))
          : noticeList?.map((post) => (
              <Post content={post} category={category} />
            ))}
      </div>
      <PageNation
        page={page}
        setPage={setPage}
        size={noticePages?.size}
        totalElements={noticePages?.totalElements}
        totalPage={noticePages?.totalPages}
      />
      <Footer />
    </div>
  );
}

export default Notice;
