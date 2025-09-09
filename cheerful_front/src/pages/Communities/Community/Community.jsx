/**@jsxImportSource @emotion/react */
import { Link, useParams } from "react-router-dom";
import * as s from "./styles";
import { useEffect, useState } from "react";
import useCommunityListQuery from "../../../queries/CommunityQuery/useCommunityListQuery";
import Post from "../../../components/Post/Post";
import CategoryComponent from "../../../components/CategoryComponent/CategoryComponent";
import Footer from "../../../components/Footer/Footer";
import PageNation from "../../../components/PageNation/PageNation";
import Loading from "../../../components/Loading/Loading";
import { communityCategory } from "../../../constants/communityPage/communityPage";

function Community(props) {
  const { category } = useParams();
  const [page, setPage] = useState(1);

  const sort = [
    { id: 1, label: "최신순" },
    { id: 2, label: "인기순" },
  ];

  const [sortName, setSortName] = useState("new");
  const [active, setActive] = useState(1);
  const communityList = useCommunityListQuery(sortName, page, 10, category);

  console.log(sortName, page, 10, category);

  useEffect(() => {
    if (active === 1) {
      setSortName("new");
    } else {
      setSortName("popular");
    }
  }, [active]);

  const communityContents = communityList?.data?.data.body || [];

  useEffect(() => {
    setPage(1);
  }, [category]);

  // console.log(communityList.data?.data.body);

  return (
    <div css={s.layout}>
      {communityList.isLoading && <Loading />}
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
            route={"community"}
            category={category}
          />
        ))}
      </div>

      <div css={s.horizon}></div>

      <div css={s.postContainer}>
        <div css={s.sort}>
          {sort.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                fontWeight: active === s.id ? "700" : "400",
              }}>
              {s.label}
            </button>
          ))}
        </div>

        {communityContents?.content?.map((content) => (
          <Post key={content.communityId} content={content} />
        ))}
      </div>

      <div>
        {communityList.isLoading ? (
          <></>
        ) : (
          <PageNation
            page={page}
            setPage={setPage}
            size={communityContents?.size}
            totalElements={communityContents?.totalElements}
            totalPage={communityContents?.totalPages}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Community;
