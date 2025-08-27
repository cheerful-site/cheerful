/**@jsxImportSource @emotion/react */
import { FaSearch } from "react-icons/fa";
import * as s from "./styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reqSearchCommunity } from "../../api/searchApi/searchApi";
import { useSearchTextStore } from "../../stores/useSearchTextStore";

function SearchBar(props) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const { searchText, setSearchText } = useSearchTextStore();

  const handleSearchOnChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearchOnClick = () => {
    setSearchText(value);
    navigate(`/search?q=${searchText}`);
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
        value={value}
      />
    </div>
  );
}

export default SearchBar;
