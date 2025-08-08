/**@jsxImportSource @emotion/react */
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import * as s from "./styles";

function Food(props) {
  const category = [
    { id: 1, title: "전체", category: 1 },
    { id: 2, title: "자유게시판", category: 2 },
    { id: 3, title: "강아지", category: 3 },
  ];

  return (
    <div css={s.layout}>
      <div css={s.foodTitle}>
        <h1>
          우리 아이가 제일 좋아하는 <span>그 맛</span>, 여기 다 있어요!
        </h1>
        <h3>잘 먹고 잘 노는 게 제일 중요하니까!</h3>
      </div>
      <div></div>
      <div></div>

      <SearchBar />

      <div></div>

      <Footer />
    </div>
  );
}

export default Food;
