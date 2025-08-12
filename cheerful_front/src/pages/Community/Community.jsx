/**@jsxImportSource @emotion/react */
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import * as s from "./styles";
import { useEffect, useState } from "react";
import useCommunityQuery from "../../queries/CommunityQuery/useCommunityQuery";
import Post from "../../components/Post/Post";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import useCommunityListQuery from "../../queries/CommunityQuery/useCommunityListQuery";

function Community(props) {
  const { category } = useParams();
  const community = useCommunityQuery(category);
  const communityList = useCommunityListQuery(1, 10);

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

  console.log(communityList?.data?.data.body);

  const contents = communityList?.data?.data.body;

  useEffect(() => {
    setCommunityContents(contents?.content);
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

      <div>{contents?.page}</div>

      <Footer />
    </div>
  );
}

export default Community;
