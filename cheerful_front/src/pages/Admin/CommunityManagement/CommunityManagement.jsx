/**@jsxImportSource @emotion/react */
import { useMemo, useState } from "react";
import * as s from "./styles";
import useAdminCommunityQuery from "../../../queries/AdminQuery/useAdminCommunityQuery";
import { reqAdminAllDeleteCommunity } from "../../../api/adminApi/adminApi";
import { communityCols } from "../../../constants/adminPage/adminPageCategory";
import { FaSearch } from "react-icons/fa";
import DataTable from "../../../components/DataTable/DataTable";
import PageNation from "../../../components/PageNation/PageNation";

function CommunityManagement(props) {
  const [inputValue, setInputValue] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const [searchOption, setSearchOption] = useState({
    page: 1,
    size: 10,
    communityCategoryId: 1,
    searchText: inputValue,
  });

  const adminCommunity = useAdminCommunityQuery(searchOption);

  const communityResponseBody = useMemo(() => {
    return adminCommunity?.data?.data?.body;
  }, [adminCommunity?.data?.data?.body]);

  const communityList = useMemo(() => {
    return communityResponseBody?.content.map((community) => ({
      ...community,
      ...community.communityCategory,
      ...community.user,
    }));
  }, [communityResponseBody]);

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

  const handelAllDeleteClick = async (selectedIds) => {
    if (confirm("삭제하시겠습니까?")) {
      try {
        await reqAdminAllDeleteCommunity(selectedIds);
        adminCommunity.refetch();
      } catch (error) {
        console.log(error);
      }
    }
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
                handelAllDeleteClick(selectedIds);
              }}>
              삭제
            </button>
          </div>
        </div>
        <DataTable
          isCheckBoxEnabled={true}
          cols={communityCols}
          rows={communityList}
          setSelectedIds={setSelectedIds}
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
