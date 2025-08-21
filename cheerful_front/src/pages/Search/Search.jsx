/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Search(props) {
  const params = useParams();
  const [searchData, setSearchData] = useState({
    searchWrod: "",
    headerTag: "community",
    categoryId: 1,
  });

  const communityCategory = [
    { id: 1, title: "전체", category: 1 },
    { id: 2, title: "자유게시판", category: 2 },
    { id: 3, title: "강아지", category: 3 },
    { id: 4, title: "고양이", category: 4 },
    { id: 5, title: "특수동물", category: 5 },
    { id: 6, title: "실종 / 목격", category: 6 },
    { id: 7, title: "임보 / 입양", category: 7 },
  ];

  const handleCommunityOnClick = () => {
    setSearchData({
      searchWrod: params.searchword,
      headerTag: "community",
      categoryId: 1,
    });
  };

  const handleFoodOnClick = () => {
    setSearchData({
      searchWrod: params.searchword,
      headerTag: "food",
      categoryId: "",
    });
  };

  const handleCategoryOnClick = (categoryId) => {
    setSearchData((prev) => ({ ...prev, categoryId: categoryId }));
  };

  return (
    <>
      <div css={s.layout(params.searchword ? true : false)}>
        <div>
          <SearchBar />
          <span css={s.text}>관심있는 내용을 검색해보세요!</span>
        </div>
        {params.searchword ? (
          <>
            <div css={s.communityOrFood(searchData.headerTag === "community")}>
              <div onClick={handleCommunityOnClick}>Community(99)</div>
              <div onClick={handleFoodOnClick}>Food(99)</div>
            </div>
            {searchData.headerTag === "food" ? (
              <></>
            ) : (
              <div css={s.categoryList}>
                {communityCategory.map((cate) => (
                  <div
                    key={cate.id}
                    css={s.category(searchData.categoryId === cate.category)}
                    onClick={() => handleCategoryOnClick(cate.category)}>
                    {cate.title}
                  </div>
                ))}
              </div>
            )}
            <div css={s.searchResult}></div>
            <div>pagenation</div>{" "}
          </>
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Search;
