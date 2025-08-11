/**@jsxImportSource @emotion/react */
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import * as s from "./styles";
import { useEffect, useState } from "react";
import useCommunityQuery from "../../queries/CommunityQuery/useCommunityQuery";
import dogImage from "../../image/img_dog3.png";
import Post from "../../components/Post/Post";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";

function Community(props) {
  const { category } = useParams();
  const community = useCommunityQuery(category);
  const [communityContents, setCommunityContents] = useState([]);
  const communityCategory = [
    { id: 1, title: "전체", category: 1 },
    { id: 2, title: "자유게시판", category: 2 },
    { id: 3, title: "강아지", category: 3 },
    { id: 4, title: "고양이", category: 4 },
    { id: 5, title: "특수동물", category: 5 },
    { id: 6, title: "실종 / 목격", category: 6 },
    { id: 7, title: "임보 / 입양", category: 7 },
  ];

  const contents = [
    {
      id: 1,
      title: "첫번째 자유글",
      content: "오늘 날씨가 참 좋네요.",
      createdAt: "2025-08-08 09:58:31",
    },
    {
      id: 2,
      title: "개발 공부 근황",
      content: "오늘 날씨가 참 좋네요.",
      createdAt: "2025-08-08 09:58:31",
    },
    {
      id: 3,
      title: "우리집 강아지 자랑",
      content: "오늘 날씨가 참 좋네요.",
      createdAt: "2025-08-08 09:58:31",
    },
    {
      id: 4,
      title: "첫번째 자유글",
      content: "오늘 날씨가 참 좋네요.",
      createdAt: "2025-08-08 09:58:31",
    },
    {
      id: 5,
      title: "길고양이 급식소 운영",
      content: "매주 주말마다 급식소 관리하고 있습니다.",
      createdAt: "2025-08-08 09:58:31",
    },
    {
      id: 6,
      title: "실종: 시츄",
      content: "8월 5일 오후 3시경, 서울 강남역 근처에서 잃어버렸습니다.",
      createdAt: "2025-08-08 09:58:31",
    },
    {
      id: 7,
      title: "첫번째 자유글",
      content: "오늘 날씨가 참 좋네요.",
      createdAt: "2025-08-08 09:58:31",
    },
    {
      id: 8,
      title: "고양이 입양처 찾습니다",
      content: "오늘 날씨가 참 좋네요.",
      createdAt: "2025-08-08 09:58:31",
    },
  ];

  useEffect(() => {
    setCommunityContents(community?.data.data.body);
  }, [category]);

  console.log(communityContents);

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
          <CategoryComponent
            key={cate.id}
            cate={cate}
            category={category}
            route={"community"}
          />
        ))}
      </div>

      <div css={s.horizon}></div>

      <div css={s.postContainer}>
        {communityContents?.map((content) => (
          <Post key={content.communityId} content={content} />
        ))}
      </div>

      <div>pagenation</div>

      <Footer />
    </div>
  );
}

export default Community;
