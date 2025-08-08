/**@jsxImportSource @emotion/react */
import { FaSearch } from "react-icons/fa";
import * as s from "./styles";

function SearchBar(props) {
  return (
    <div css={s.searchBar}>
      <FaSearch />
      <input autoFocus type="text" placeholder="Search for..." />
    </div>
  );
}

export default SearchBar;
