/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useSearchFoodQuery from "../../queries/SearchQuery/useSearchFoodQuery";
import useSearchCommunityQuery from "../../queries/SearchQuery/useSearchCommunityQuery";
import { useSearchTextStore } from "../../stores/useSearchTextStore";
import Post from "../../components/Post/Post";
import PageNation from "../../components/PageNation/PageNation";
import notFound from "../../logo/cheerful_searchNotfound.png";
import { communityCategory } from "../../constants/communityPage/communityPage";

function Search(props) {
  const navigate = useNavigate();
  const { searchText } = useSearchTextStore();
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState({
    searchWord: searchText,
    headerTag: "community",
    categoryId: 1,
  });

  const searchFood = useSearchFoodQuery(page, 12, searchData.searchWord);
  const searchCommunity = useSearchCommunityQuery(
    page,
    5,
    searchData.searchWord,
    searchData.categoryId
  );

  const searchCommunityList = searchCommunity?.data?.data?.body || [];
  const searchFoodList = searchFood?.data?.data?.body || [];

  console.log(searchFoodList?.content?.length);
  console.log(searchCommunityList?.content?.length);
  // console.log(params.searchword);

  useEffect(() => {
    setSearchData({
      searchWord: searchText,
      headerTag: "community",
      categoryId: 1,
    });
  }, [searchText]);

  const handleCommunityOnClick = () => {
    setSearchData({
      searchWord: searchText,
      headerTag: "community",
      categoryId: 1,
    });
  };

  const handleFoodOnClick = () => {
    setSearchData({
      searchWord: searchText,
      headerTag: "food",
      categoryId: 1,
    });
  };

  const handleCategoryOnClick = (categoryId) => {
    setSearchData((prev) => ({ ...prev, categoryId: categoryId }));
  };

  const handleDetailOnClick = (foodId) => {
    navigate(`/food/${foodId}`);
  };

  console.log(searchData.headerTag === "food");
  return (
    <>
      <div css={s.layout(!!searchText ? true : false)}>
        <div>
          <SearchBar />
          <span css={s.text}>관심있는 내용을 검색해보세요!</span>
        </div>
        {!!searchText ? (
          <>
            <div css={s.communityOrFood(searchData.headerTag === "community")}>
              <div onClick={handleCommunityOnClick}>
                Community({searchCommunityList?.totalElements})
              </div>
              <div onClick={handleFoodOnClick}>
                Food({searchFoodList?.totalElements})
              </div>
            </div>
            {searchData.headerTag === "food" ? (
              <>
                {/* food Search Result */}
                <div css={s.searchResult}>
                  {searchFoodList?.content?.length === 0 ? (
                    <div css={s.searchFoodTextNotFound}>
                      <img src={notFound} alt="" />
                      <span>게시물을 찾을 수 없습니다.</span>
                    </div>
                  ) : (
                    <div css={s.foodContainer}>
                      {searchFoodList?.content?.map((food) => (
                        <div key={food.foodId}>
                          <img
                            src={`${food.foodImgs[0].imgUrl}`}
                            alt=""
                            onClick={() => handleDetailOnClick(food.foodId)}
                          />
                          <div>
                            <span
                              onClick={() => handleDetailOnClick(food.foodId)}>
                              {food.title}
                            </span>
                            <span>{food.price.toLocaleString()}원</span>
                            <span>{food.foodCategory?.foodCategoryName}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <PageNation
                  page={page}
                  setPage={setPage}
                  size={searchFoodList?.size}
                  totalElements={searchFoodList?.totalElements}
                  totalPage={searchFoodList?.totalPages}
                />
              </>
            ) : (
              <>
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
                {/* Community Search Result */}
                {searchCommunityList?.content?.length === 0 ? (
                  <div css={s.searchTextNotFound}>
                    <img src={notFound} alt="" />
                    <span>게시물을 찾을 수 없습니다.</span>
                  </div>
                ) : (
                  <>
                    <div css={s.searchResult}>
                      {searchCommunityList?.content?.map((community) => (
                        <Post content={community} />
                      ))}
                    </div>
                    <PageNation
                      page={page}
                      setPage={setPage}
                      size={searchCommunityList?.size}
                      totalElements={searchCommunityList?.totalElements}
                      totalPage={searchCommunityList?.totalPages}
                    />
                  </>
                )}
              </>
            )}
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
