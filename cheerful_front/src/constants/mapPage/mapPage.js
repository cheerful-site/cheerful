export const mapCategory = [
  { id: 1, title: "동물병원", category: 1 },
  { id: 2, title: "카페", category: 2 },
  { id: 3, title: "보호소", category: 3 },
];

export const CLEAN_STYLE = [
  { featureType: "poi", stylers: [{ visibility: "off" }] }, // 모든 POI
  { featureType: "poi.business", stylers: [{ visibility: "off" }] }, // 상업시설
  { featureType: "poi.medical", stylers: [{ visibility: "off" }] }, // 병원 아이콘
  { featureType: "poi.school", stylers: [{ visibility: "off" }] },
  { featureType: "poi.park", stylers: [{ visibility: "off" }] },
  // { featureType: "transit.station", stylers: [{ visibility: "off" }] }, // 역 아이콘
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  }, // ✅ 도로명 라벨 숨김
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  }, // 행정구역 라벨 숨김
];
