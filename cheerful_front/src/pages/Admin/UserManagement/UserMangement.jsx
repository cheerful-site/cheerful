/**@jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import useAdminUsersQuery from "../../../queries/AdminQuery/useAdminUsersQuery";
import { usersCols } from "../../../constants/adminPage/adminPageCategory";
import { reqAdminAllDeleteUsers } from "../../../api/adminApi/adminApi";
import { FaSearch } from "react-icons/fa";
import DataTable from "../../../components/DataTable/DataTable";
import PageNation from "../../../components/PageNation/PageNation";

function UserMangement(props) {
  const [inputValue, setInputValue] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const [searchOption, setSearchOption] = useState({
    page: 1,
    size: 10,
    searchText: inputValue,
  });

  const adminUser = useAdminUsersQuery(searchOption);
  const adminUserResponseBody = adminUser?.data?.data?.body;
  const adminUserList = adminUserResponseBody?.content;

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
        await reqAdminAllDeleteUsers(selectedIds);
        adminUser.refetch();
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
          cols={usersCols}
          rows={adminUserList}
          enabledDelete={true}
          setSelectedIds={setSelectedIds}
        />

        <PageNation
          page={searchOption.page}
          setPage={setPage}
          size={adminUserResponseBody?.size}
          totalElements={adminUserResponseBody?.totalElements}
          totalPage={adminUserResponseBody?.totalPages}
        />
      </div>
    </div>
  );
}

export default UserMangement;
