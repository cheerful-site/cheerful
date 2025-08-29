/**@jsxImportSource @emotion/react */
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import * as s from "./styles";
import { useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import usePrincipalQuery from "../../queries/PrincipalQuery/usePrincipalQuery";
import useHomeBestFoodQuery from "../../queries/HomeQuery/useHomeBestFoodQuery";
import useHomeBestCommunityQuery from "../../queries/HomeQuery/useHomeBestCommunityQuery";
import { Link, useNavigate } from "react-router-dom";
import noImage from "../../icons/Frame2.png";
import mapImage from "../../../logo/cheerful_home_map.png";
import communitImage from "../../../logo/cheerful_home_community.png";
import foodImage from "../../../logo/cheerful_home_food.png";

function Home(props) {
  const principal = usePrincipalQuery();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const bestFood = useHomeBestFoodQuery();
  const bestCommunity = useHomeBestCommunityQuery();

  const foodImg = bestFood?.data?.data?.body;
  const visibleCount = 3;
  const journal = [
    bestCommunity?.data?.data?.body.mostLiked,
    bestCommunity?.data?.data?.body.mostViewed,
    bestCommunity?.data?.data?.body.bestFoster,
    bestCommunity?.data?.data?.body.bestMissing,
  ];

  // console.log(foodImg);
  // console.log(journal);

  const slideNext = () => {
    if (currentIndex < foodImg.length - visibleCount) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const slidePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const [center, setCenter] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // 현재 위치: 위도,경도
      const { latitude, longitude } = position?.coords;
      setCenter({ lat: latitude, lng: longitude });
    });
  }, []);

  const handleGotoCommunityOnClick = (categoryId, id) => {
    navigate(`/community/${categoryId}/${id}`);
  };

  const handleGoToFoodOnClick = (id) => {
    navigate(`/food/${id}`);
  };

  return (
    <>
      <div css={s.layout}>
        <div css={s.mainContents}>
          <div css={s.logoContainer}>
            <div></div>
            <div></div>
            <img css={s.logo} src="../../logo/cheerful_mainlogo.png" alt="" />
          </div>

          <div css={s.serachBarContainer}>
            <div>
              <span>똥꼬발랄</span>한 이야기, 여기 다 있어요!
            </div>
            <div>필요한 정보를 빠르게 찾고, 귀여운 친구들과 교류해보세요.</div>
            <div>
              <SearchBar />
            </div>
          </div>

          <div css={s.foodInfo}>
            <div css={s.imgContainer}>
              <Link to={"/community/1"}>
                <img src={communitImage} alt="" />
              </Link>
              <Link to={"/food"}>
                <img src={foodImage} alt="" />
              </Link>
              <Link to={"/map/1"}>
                <img src={mapImage} alt="" />
              </Link>
            </div>

            <div css={s.reviewContainer}>
              <span>똥꼬발랄 탐방일지</span>
              <div css={s.foodReviewContainer}>
                {/* best 글 표시 */}
                {journal.map((popular, index) => (
                  <div css={s.foodReview} key={popular?.communityId}>
                    <div
                      onClick={() =>
                        handleGotoCommunityOnClick(
                          popular?.communityCategoryId,
                          popular?.communityId
                        )
                      }>
                      {/* 111 */}
                      <img
                        src={
                          popular?.communityImgs?.length === 0
                            ? noImage
                            : popular?.communityImgs[0]?.imgUrl
                        }
                        alt=""
                      />
                    </div>
                    <div>
                      {/* 222 */}
                      <div>
                        <span
                          onClick={() =>
                            handleGotoCommunityOnClick(
                              popular?.communityCategoryId,
                              popular?.communityId
                            )
                          }>
                          {popular?.title}
                        </span>
                      </div>
                      <span>{popular?.content}</span>
                      <div>
                        <span>{popular?.user?.name}</span>
                        <span>{popular?.createdAt.slice(0, 10)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div css={s.foodImgContainer}>
            {/* 인기 푸드 표시  */}
            {foodImg
              ?.slice(currentIndex, currentIndex + visibleCount)
              ?.map((food) => {
                return (
                  <div key={food?.foodId}>
                    <img
                      src={
                        food?.foodImgs.lenght === 0
                          ? noImage
                          : food?.foodImgs[0].imgUrl
                      }
                      alt=""
                      onClick={() => handleGoToFoodOnClick(food?.foodId)}
                    />
                    <div css={s.foodImgInfo}>
                      <span onClick={() => handleGoToFoodOnClick(food?.foodId)}>
                        {food?.title}
                      </span>
                      <span>{food?.foodCategoryId?.foodCategoryName}</span>
                      <span>{food?.price.toLocaleString()}원</span>
                    </div>
                  </div>
                );
              })}
            <button css={s.leftArrow} onClick={slidePrev}>
              <FaArrowLeft />
            </button>
            <button css={s.rightArrow} onClick={slideNext}>
              <FaArrowRight />
            </button>
          </div>

          <div css={s.mapContainer}>
            <div css={s.googleMap}>
              <Wrapper apiKey={import.meta.env.VITE_REACT_APP_API_KEY}>
                <GoogleMap
                  mapContainerStyle={{
                    width: "85rem",
                    height: "38rem",
                    borderRadius: "1.5rem",
                    boxShadow:
                      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                  }}
                  center={center}
                  zoom={15}></GoogleMap>
              </Wrapper>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
