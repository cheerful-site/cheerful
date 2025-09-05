/**@jsxImportSource @emotion/react */
import { FaSearch } from "react-icons/fa";
import * as s from "./styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchTextStore } from "../../stores/useSearchTextStore";

function SearchBar(props) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const { setSearchText } = useSearchTextStore();

  const handleSearchOnChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearchOnClick = () => {
    // setSearchText(value);
    // navigate(`/search?q=${searchText}`);

    //setter를 내려줘서 searchText 변경

    const keyword = value.trim();
    if (!keyword) return;
    setSearchText(keyword);
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
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
          if (e.key === "Enter") handleSearchOnClick();
        }}
        value={value}
      />
    </div>
  );
}

export default SearchBar;
