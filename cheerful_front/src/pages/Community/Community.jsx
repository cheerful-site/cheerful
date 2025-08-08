/**@jsxImportSource @emotion/react */
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import * as s from "./styles";
import { useEffect } from "react";
import useCommunityQuery from "../../queries/CommunityQuery/useCommunityQuery";

function Community(props) {
  const { category } = useParams();
  const community = useCommunityQuery(category);
  const communityCategory = [
    { id: 1, title: "전체", category: 1 },
    { id: 2, title: "자유게시판", category: 2 },
    { id: 3, title: "강아지", category: 3 },
    { id: 4, title: "고양이", category: 4 },
    { id: 5, title: "특수동물", category: 5 },
    { id: 6, title: "실종 / 목격", category: 6 },
    { id: 7, title: "임보 / 입양", category: 7 },
  ];

  console.log(category);

  useEffect(() => {
    console.log(community.data);
  }, [category]);

  return (
    <div css={s.layout}>
      <div css={s.communityTitle}>
        <div>
          <span>똥꼬발랄</span>한 이야기들이 한가득!
        </div>
        <div>여긴, 반려동물 세상</div>
      </div>

      <div css={s.categoryList}>
        {communityCategory.map((cate) => (
          <Link
            css={s.category(parseInt(category) === cate.category)}
            key={cate.id}
            to={`/community/${cate.category}`}>
            {cate.title}
          </Link>
        ))}
      </div>

      <div css={s.horizon}></div>

      <div></div>

      <Footer />
    </div>
  );
}

export default Community;
