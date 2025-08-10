/**@jsxImportSource @emotion/react */
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import * as s from "./styles";

function Notice(props) {
  const { category } = useParams();
  const contents = [
    {
      id: 1,
      title: "데이터 추가 및 업데이트 안내 (2025-08-04)",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      author: "admin",
      createdAt: "2025-08-08 09:58:31",
      category: 1,
    },
    {
      id: 2,
      title: "데이터 추가 및 업데이트 안내 (2025-08-04)",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      author: "admin",
      createdAt: "2025-08-08 09:58:31",
      category: 2,
    },
    {
      id: 3,
      title: "데이터 추가 및 업데이트 안내 (2025-08-04)",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      author: "admin",
      createdAt: "2025-08-08 09:58:31",
      category: 3,
    },
    {
      id: 4,
      title: "데이터 추가 및 업데이트 안내 (2025-08-04)",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      author: "admin",
      createdAt: "2025-08-08 09:58:31",
      category: 3,
    },
  ];

  const noticeCategory = [
    { id: 1, title: "공지사항", category: 1 },
    { id: 2, title: "매거진", category: 2 },
    { id: 3, title: "이벤트", category: 3 },
  ];

  return (
    <div css={s.layout}>
      <div css={s.noticeTitle}>
        <div>
          우리 커뮤니티의 <span>똥꼬발랄한 소식</span>들, 다 여기 있어요!
        </div>
        <div>지금, 무슨 일이 일어나고 있을까요?</div>
      </div>

      <div css={s.categoryList}>
        {noticeCategory.map((cate) => (
          <Link
            css={s.category(parseInt(category) === cate.category)}
            key={cate.id}
            to={`/notice/${cate.category}`}>
            {cate.title}
          </Link>
        ))}
      </div>

      <div css={s.noticePostContainer}>
        {contents.map((post) => (
          <div key={post.id} css={s.noticePost}>
            <div>{post.title}</div>
            <div>{post.createdAt.substring(0, 10)}</div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Notice;
