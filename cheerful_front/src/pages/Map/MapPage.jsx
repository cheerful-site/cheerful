/**@jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import * as s from "./styles";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, InfoBox, MarkerF } from "@react-google-maps/api";
import useMapQuery from "../../queries/MapQuery/useMapQuery";
import mapCenter from "../../logo/cheerful_map_center.png";
import hospital24 from "../../logo/cheerful_map_24hospital.png";
import hospital from "../../logo/cheerful_map_hospital.png";
import cafe from "../../logo/cheerful_map_cafe.png";
import shelter from "../../logo/cheerful_map_shelter.png";
import { CLEAN_STYLE, mapCategory } from "../../constants/mapPage/mapPage";
import Loading from "../../components/Loading/Loading";

function MapPage(props) {
  const { category } = useParams();
  const mapRef = useRef(null);
  const centerRef = useRef({ lat: 35.1595454, lng: 129.0616078 });

  const [searchMap, setSearchMap] = useState({
    lat: centerRef.current.lat,
    lng: centerRef.current.lng,
    radius: 3000,
    categoryId: Number(category),
  });

  const [selected, setSelected] = useState(null);

  const toLatLng = (lat, lng) => {
    const _lat = Number(lat);
    const _lng = Number(lng);
    return Number.isFinite(_lat) && Number.isFinite(_lng)
      ? { lat: _lat, lng: _lng }
      : null;
  };

  const [center, setCenter] = useState(null);

  useEffect(() => {
    setSearchMap((prev) => ({
      ...prev,
      categoryId: Number(category),
    }));
  }, [category]);

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

  const map = useMapQuery(searchMap);
  const mapList = map?.data?.data?.body || [];

  const onIdle = useCallback(() => {
    if (!mapRef.current) return;
    const c = mapRef.current.getCenter();
    const next = { lat: c.lat(), lng: c.lng() };
    setCenter(next); // 중심 마커 이동
    setSearchMap((prev) => ({ ...prev, lat: next.lat, lng: next.lng })); // 쿼리 갱신 → 재조회
  }, []);

  const onIdleDebounced = useMemo(() => {
    let t;
    return () => {
      clearTimeout(t);
      t = setTimeout(onIdle, 2000); // 2초 정지 시에만 실행
    };
  }, [onIdle]);

  const activeCategoryId = Number(category);
  const filteredList = mapList.filter(
    (id) => id?.categoryId === activeCategoryId
  );

  useEffect(() => {
    setSelected(null);
  }, [category]);

  // console.log(mapList);

  return (
    <div css={s.layout}>
      {map.isLoading && <Loading />}
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
            onLoad={(m) => (mapRef.current = m)}
            onIdle={onIdleDebounced}
            mapContainerStyle={{
              width: "93.6rem",
              height: "51rem",
              borderRadius: "1.5rem",
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
            center={center}
            zoom={15}
            options={{
              styles: CLEAN_STYLE,
              clickableIcons: false,
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
            }}>
            {center &&
              Number.isFinite(center.lat) &&
              Number.isFinite(center.lng) && (
                <MarkerF
                  position={center}
                  icon={{
                    url: mapCenter,
                    scaledSize: new google.maps.Size(50, 50),
                  }}
                />
              )}

            {filteredList?.map((info) => {
              const loc = info?.mapInfoLocationDto;
              const pos = toLatLng(loc?.mapInfoLat, loc?.mapInfoLng);
              if (!pos) return null;

              let iconUrl = null;
              if (info?.categoryId === 1)
                iconUrl = info.fullTime ? hospital24 : hospital;
              if (info?.categoryId === 2) iconUrl = cafe;
              if (info?.categoryId === 3) iconUrl = shelter;

              return (
                <MarkerF
                  key={info.mapInfoId ?? `${pos.lat},${pos.lng}`}
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
                      // pixelOffset: new google.maps.Size(-140, -220),
                    }}>
                    <div css={s.infoCard}>
                      <div css={s.infoCardTitle}>
                        <div>{selected?.name}</div>
                        <button onClick={() => setSelected(null)}>✕</button>
                      </div>
                      {selected?.address && (
                        <div css={s.address}>주소: {selected.address}</div>
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

      <Footer />
    </div>
  );
}

export default MapPage;
