/**@jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import useAdminCommunityQuery from "../../../queries/AdminQuery/useAdminCommunityQuery";
import { reqAdminAllDeleteCommunity } from "../../../api/adminApi/adminApi";
import { communityCols } from "../../../constants/adminPage/adminPageCategory";
import { FaSearch } from "react-icons/fa";
import DataTable from "../../../components/DataTable/DataTable";
import PageNation from "../../../components/PageNation/PageNation";

function CommunityManagement(props) {
  const [inputValue, setInputValue] = useState("");

  const [searchOption, setSearchOption] = useState({
    page: 1,
    size: 10,
    communityCategoryId: 1,
    searchText: inputValue,
  });

  const adminCommunity = useAdminCommunityQuery(searchOption);

  const communityResponseBody = adminCommunity?.data?.data?.body;
  // console.log(communityResponseBody);

  const communityList = communityResponseBody?.content.map((community) => ({
    ...community,
    ...community.communityCategory,
    ...community.user,
  }));

  const setPage = (page) => {
    setSearchOption((prev) => ({ ...prev, page }));
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchOnClick = () => {
    setSearchOption((prev) => ({
      ...prev,
      searchText: inputValue,
    }));
  };

  const handelAllDeleteClick = async (ids) => {
    await reqAdminAllDeleteCommunity(ids);
    adminCommunity.refetch();
    return;
  };

  return (
    <div css={s.manageContent}>
      <div>
        <div css={s.manageSearch}>
          <input
            type="text"
            placeholder="Search for ..."
            onChange={handleOnChange}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.keyCode === 13) handleSearchOnClick();
            }}
          />
          <FaSearch onClick={handleSearchOnClick} />
        </div>

        <div css={s.category}>
          <div css={s.registerAndDel}>
            <button
              onClick={() => {
                handelAllDeleteClick(
                  newRows
                    .filter((row) => row.checked)
                    .map((row) => row.datas[0].value)
                );
              }}>
              삭제
            </button>
          </div>
        </div>
        <DataTable
          isCheckBoxEnabled={true}
          cols={communityCols}
          rows={communityList}
          enabledDelete={true}
        />

        <PageNation
          page={searchOption.page}
          setPage={setPage}
          size={communityResponseBody?.size}
          totalElements={communityResponseBody?.totalElements}
          totalPage={communityResponseBody?.totalPages}
        />
      </div>
    </div>
  );
}

export default CommunityManagement;
