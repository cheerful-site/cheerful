/**@jsxImportSource @emotion/react */
import { FaSearch } from "react-icons/fa";
import * as s from "./styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reqSearchCommunity } from "../../api/searchApi/searchApi";

function SearchBar(props) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleSearchOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchOnClick = () => {
    navigate(`/search/${inputValue}`);
  };

  return (
    <div css={s.searchBar}>
      <FaSearch onClick={handleSearchOnClick} />
      <input
        autoFocus
        type="text"
        placeholder="Search for..."
        name="search"
        onChange={handleSearchOnChange}
        onKeyDown={(e) => {
          if (e.keyCode === 13) handleSearchOnClick();
        }}
        value={inputValue}
      />
    </div>
  );
}

export default SearchBar;
