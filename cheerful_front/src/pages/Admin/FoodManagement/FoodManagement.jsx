/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { useMemo, useState } from "react";
import { reqAdminAllDeleteFood } from "../../../api/adminApi/adminApi";
import useAdminFoodQuery from "../../../queries/AdminQuery/useAdminFoodQuery";
import { FaSearch } from "react-icons/fa";
import { foodCols } from "../../../constants/adminPage/adminPageCategory";
import DataTable from "../../../components/DataTable/DataTable";
import PageNation from "../../../components/PageNation/PageNation";
import AdminManagementFoodRegisterModal from "../../../components/AdminManagementFoodModal/AdminManagementFoodRegisterModal";
import { useAdminModifyDataStore } from "../../../stores/useAdminModalStore";
import AdminManagementFoodModifyModal from "../../../components/AdminManagementFoodModal/AdminManagementFoodModifyModal";

function FoodManagement(props) {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [modifyData, setModifyData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [searchOption, setSearchOption] = useState({
    page: 1,
    size: 10,
    searchText: inputValue,
  });

  const adminFood = useAdminFoodQuery(searchOption);

  const foodResponseBody = useMemo(() => {
    return adminFood?.data?.data?.body;
  }, [adminFood?.data?.data?.body]);

  const foodList = useMemo(() => {
    return foodResponseBody?.content.map((food) => ({
      ...food,
      ...food.foodCategory,
      ...food.user,
    }));
  }, [foodResponseBody]);

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
    setOpenModifyModal(true);
    setModifyData(row);
  };

  const handelAllDeleteClick = async (selectedIds) => {
    console.log(selectedIds);
    if (confirm("삭제하시겠습니까?")) {
      try {
        await reqAdminAllDeleteFood(selectedIds);
        adminFood.refetch();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div css={s.manageContent}>
      <AdminManagementFoodRegisterModal
        isOpen={openRegisterModal}
        setOpen={setOpenRegisterModal}
      />
      <AdminManagementFoodModifyModal
        isOpen={openModifyModal}
        setOpen={setOpenModifyModal}
        modifyData={modifyData}
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
                setOpenRegisterModal(true);
              }}>
              등록
            </button>
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
          cols={foodCols}
          rows={foodList}
          setSelectedIds={setSelectedIds}
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
