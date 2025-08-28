/**@jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import * as s from "./styles";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import { useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap } from "@react-google-maps/api";

function MapPage(props) {
  const { category } = useParams();
  const mapCategory = [
    { id: 1, title: "동물병원", category: 1 },
    { id: 2, title: "카페", category: 2 },
    { id: 3, title: "보호소", category: 3 },
  ];

  const [center, setCenter] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // 현재 위치: 위도,경도
      const { latitude, longitude } = position?.coords;
      setCenter({ lat: latitude, lng: longitude });
    });
  }, []);

  console.log(category);
  return (
    <div css={s.layout}>
      <div css={s.mapTitle}>
        <div>
          우리 동네, <span>반려 생활 지킴</span>이 지도
        </div>
        <div>24시 동물병원부터 유기동물 보호소까지, 한 눈에 찾기</div>
      </div>

      <div css={s.categoryList}>
        {mapCategory.map((cate) => (
          <CategoryComponent
            key={cate.id}
            cate={cate}
            category={category}
            route={"map"}
          />
        ))}
      </div>

      <div css={s.horizon}></div>

      <div css={s.googleMap}>
        <Wrapper apiKey={import.meta.env.VITE_REACT_APP_API_KEY}>
          <GoogleMap
            mapContainerStyle={{
              width: "93.6rem",
              height: "51rem",
              borderRadius: "1.5rem",
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
            center={center}
            zoom={15}></GoogleMap>
        </Wrapper>
      </div>

      <Footer />
    </div>
  );
}

export default MapPage;
