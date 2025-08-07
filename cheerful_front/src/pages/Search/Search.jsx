/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";

function Search(props) {
  return (
    <>
      <div css={s.layout}>
        <SearchBar />
        <span css={s.text}>관심있는 내용을 검색해보세요!</span>
      </div>
      <Footer />
    </>
  );
}

export default Search;
