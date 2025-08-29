/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { useState } from "react";
import { reqAdminAllDeleteFood } from "../../../api/adminApi/adminApi";
import useAdminFoodQuery from "../../../queries/AdminQuery/useAdminFoodQuery";
import { FaSearch } from "react-icons/fa";
import { foodCols } from "../../../constants/adminPage/adminPageCategory";
import DataTable from "../../../components/DataTable/DataTable";
import PageNation from "../../../components/PageNation/PageNation";
import AdminManagementFoodRegisterModal from "../../../components/AdminManagementFoodModal/AdminManagementFoodRegisterModal";
import { useAdminModifyDataStore } from "../../../stores/useAdminModalStore";

function FoodManagement(props) {
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [searchOption, setSearchOption] = useState({
    page: 1,
    size: 10,
    searchText: inputValue,
  });

  const adminFood = useAdminFoodQuery(searchOption);

  const foodResponseBody = adminFood?.data?.data?.body;

  const foodList = foodResponseBody?.content.map((food) => ({
    ...food,
    ...food.foodCategory,
    ...food.user,
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

  const handleModifyOnClick = (row) => {
    setOpenModal(true);
  };

  const handelAllDeleteClick = async (ids) => {
    await reqAdminAllDeleteFood(ids);
    adminFood.refetch();
    return;
  };

  return (
    <div css={s.manageContent}>
      <AdminManagementFoodRegisterModal
        isOpen={openModal}
        setOpen={setOpenModal}
      />
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
                setOpenModal(true);
              }}>
              등록
            </button>
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
          cols={foodCols}
          rows={foodList}
          enabledModify={true}
          onModifyClick={handleModifyOnClick}
        />

        <PageNation
          page={searchOption.page}
          setPage={setPage}
          size={foodResponseBody?.size}
          totalElements={foodResponseBody?.totalElements}
          totalPage={foodResponseBody?.totalPages}
        />
      </div>
    </div>
  );
}

export default FoodManagement;
