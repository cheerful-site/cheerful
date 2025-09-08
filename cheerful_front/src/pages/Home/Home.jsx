/**@jsxImportSource @emotion/react */
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import * as s from "./styles";
import { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, MarkerF, InfoBox } from "@react-google-maps/api";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import useHomeBestFoodQuery from "../../queries/HomeQuery/useHomeBestFoodQuery";
import useHomeBestCommunityQuery from "../../queries/HomeQuery/useHomeBestCommunityQuery";
import { Link, useNavigate } from "react-router-dom";
import noImage from "../../icons/Frame2.png";
import mapImage from "../../../logo/cheerful_home_map.png";
import communitImage from "../../../logo/cheerful_home_community.png";
import foodImage from "../../../logo/cheerful_home_food.png";
import mapCenter from "../../../logo/cheerful_map_center.png";
import { CLEAN_STYLE } from "../../constants/mapPage/mapPage";
import useMapQuery from "../../queries/MapQuery/useMapQuery";
import hospital24 from "../../../logo/cheerful_map_24hospital.png";
import hospital from "../../../logo/cheerful_map_hospital.png";

function Home(props) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const centerRef = useRef({ lat: 35.1595454, lng: 129.0616078 });
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

  const [searchMap, setSearchMap] = useState({
    lat: centerRef.current.lat,
    lng: centerRef.current.lng,
    radius: 3000,
    categoryId: 1,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const lat = Number(coords.latitude);
        const lng = Number(coords.longitude);
        setCenter({ lat, lng });
        setSearchMap((prev) => ({ ...prev, lat, lng }));
      },
      () => {}, // 실패 시 기본 좌표 유지
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  const [selected, setSelected] = useState(null);
  const map = useMapQuery(searchMap);
  const mapList = map?.data?.data?.body || [];

  console.log(mapList);
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

  const toLatLng = (lat, lng) => {
    const _lat = Number(lat);
    const _lng = Number(lng);
    return Number.isFinite(_lat) && Number.isFinite(_lng)
      ? { lat: _lat, lng: _lng }
      : null;
  };

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
                  <div css={s.foodReview} key={index}>
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
                  options={{
                    styles: CLEAN_STYLE,
                    clickableIcons: false,
                    streetView: false,
                    mapTypeControl: true,
                    fullscreenControl: true,
                  }}
                  center={center}
                  zoom={15}>
                  <MarkerF
                    position={center}
                    icon={{
                      url: mapCenter,
                      scaledSize: { width: 45, height: 45 },
                    }}
                  />

                  {mapList?.map((info) => {
                    const location = info?.mapInfoLocationDto;
                    const pos = toLatLng(
                      location?.mapInfoLat,
                      location?.mapInfoLng
                    );
                    let iconUrl = null;
                    iconUrl = info?.fullTime ? hospital24 : hospital;

                    return (
                      <MarkerF
                        key={info?.mapInfoId}
                        position={pos}
                        title={info?.name}
                        icon={{
                          url: iconUrl,
                          scaledSize: { width: 45, height: 45 },
                        }}
                        onClick={() => setSelected(info)}
                      />
                    );
                  })}
                  {selected &&
                    (() => {
                      const p = toLatLng(
                        selected?.mapInfoLocationDto?.mapInfoLat,
                        selected?.mapInfoLocationDto?.mapInfoLng
                      );
                      if (!p) return null;
                      return (
                        <InfoBox
                          position={p}
                          options={{
                            closeBoxURL: "", // 기본 X 제거
                            enableEventPropagation: true,
                            pixelOffset: new google.maps.Size(-140, -180),
                          }}>
                          <div css={s.infoCard}>
                            <div css={s.infoCardTitle}>
                              <div>{selected?.name}</div>
                              <button onClick={() => setSelected(null)}>
                                ✕
                              </button>
                            </div>
                            {selected?.address && (
                              <div css={s.address}>
                                주소: {selected.address}
                              </div>
                            )}
                            {selected?.phoneNumber && (
                              <div css={s.phoneNumber}>
                                전화: {selected.phoneNumber}
                              </div>
                            )}
                            {selected?.operationTime && (
                              <div css={s.operationTime}>
                                영업시간: {selected.operationTime}
                              </div>
                            )}
                            {selected?.breakTime && (
                              <div css={s.breakTime}>
                                브레이크타임: {selected.breakTime}
                              </div>
                            )}
                            {selected?.fullTime && (
                              <div css={s.fullTime}>24시간 운영</div>
                            )}
                            {selected?.content && (
                              <div css={s.content}>{selected?.content}</div>
                            )}
                          </div>
                        </InfoBox>
                      );
                    })()}
                </GoogleMap>
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
