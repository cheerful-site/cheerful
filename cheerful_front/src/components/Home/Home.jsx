/**@jsxImportSource @emotion/react */
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import * as s from "./styles";
import { useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { BiCurrentLocation } from "react-icons/bi";

function Home(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const foodImg = [
    {
      id: 1,
      img: "https://thumbnail8.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/148035108744683-13d569be-dfc6-4f40-b2f0-2331719e0063.jpg",
      foodName: "덴탈헬스 강아지 덴탈껌",
      category: "간식",
      price: "12,000원",
    },
    {
      id: 2,
      img: "https://thumbnail6.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/70337949887090-67ae0e15-ff23-4ec0-a34f-ba33a635c1a4.jpg",
      foodName: "탐사 강아지 간식 리얼 촉촉 큐브 져키",
      category: "간식",
      price: "25,000원",
    },
    {
      id: 3,
      img: "https://thumbnail10.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/2020/10/21/0/5/1f9eb328-ba16-496d-9591-2aecdf5b6f0a.jpg",
      foodName: "청담닥터스랩 강아지 데일리 솔루션 기능성 사료",
      category: "사료",
      price: "50,000원",
    },
    // {
    //   id: 4,
    //   img: "https://thumbnail7.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/1196781072401681-b8373db1-89b4-4fbd-9c9a-0e1776839bd3.jpg",
    //   foodName: "마이펫닥터 강아지 시그니처 유기농 기능성 사료",
    //   category: "사료",
    //   price: "45,000원",
    // },
  ];
  const totalSlides = foodImg.length;
  const arrays = [1, 2, 3, 4];

  const slidePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  const slideNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const [center, setCenter] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // 현재 위치: 위도,경도
      const { latitude, longitude } = position?.coords;
      setCenter({ lat: latitude, lng: longitude });
    });
  }, []);

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
              <img src="src/image/img_dog2.png" alt="" />
              <img src="src/image/img_shiba.png" alt="" />
              <img src="src/image/img_welshcorgi.png" alt="" />
            </div>

            <div css={s.reviewContainer}>
              <span>똥꼬발랄 탐방일지</span>
              <div css={s.foodReviewContainer}>
                {arrays.map((r, index) => {
                  return (
                    <div css={s.foodReview} key={index}>
                      <span>Food Name</span>
                      <span>⭐️ ⭐️ ⭐️ ⭐️ ⭐️</span>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor
                      </span>
                      <span>xxxx.xx.xx</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div css={s.foodImgContainer}>
            {foodImg.map((info) => {
              return (
                <div key={info.id}>
                  <img src={info.img} alt="" />
                  <div css={s.foodImgInfo}>
                    <span>{info.foodName}</span>
                    <span>{info.category}</span>
                    <span>{info.price}</span>
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
            <div css={s.mapCategory}>
              <div>동물병원</div>
              <div>카페</div>
              <div>보호소</div>
            </div>
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
                  zoom={15}>
                  <MarkerF
                    position={center}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      fillColor: "#FF0000", // 원하는 컬러
                      fillOpacity: 1,
                      strokeWeight: 1,
                      strokeColor: "#FFFFFF",
                      scale: 8,
                    }}
                  />
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
