/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useEffect, useMemo, useState } from "react";
import useAdminNoticeQuery from "../../../queries/AdminQuery/useAdminNoticeQuery";
import { reqAdminAllDeleteNotice } from "../../../api/adminApi/adminApi";
import {
  noticeCategory,
  noticeCols,
} from "../../../constants/adminPage/adminPageCategory";
import { FaSearch } from "react-icons/fa";
import DataTable from "../../../components/DataTable/DataTable";
import PageNation from "../../../components/PageNation/PageNation";
import AdminManagementNoticeRegisterModal from "../../../components/AdminManagementNoticeModal/AdminManagementNoticeRegisterModal";
import { useAdminModifyDataStore } from "../../../stores/useAdminModalStore";
import AdminManagementNoticeModifyModal from "../../../components/AdminManagementNoticeModal/AdminManagementNoticeModifyModal";

function NoticeManagement(props) {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [modifyData, setModifyData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [searchOption, setSearchOption] = useState({
    page: 1,
    size: 10,
    noticeCategoryId: 1,
    searchText: inputValue,
  });

  const adminNotice = useAdminNoticeQuery(searchOption);

  const noticeResponseBody = useMemo(() => {
    return adminNotice?.data?.data?.body;
  }, [adminNotice?.data?.data?.body]);

  const noticeList = useMemo(() => {
    return noticeResponseBody?.content.map((notice) => ({
      ...notice,
      ...notice.noticeCategory,
      ...notice.user,
    }));
  }, [noticeResponseBody]);

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
        await reqAdminAllDeleteNotice(selectedIds);
        adminNotice.refetch();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div css={s.manageContent}>
      <AdminManagementNoticeRegisterModal
        isOpen={openRegisterModal}
        setOpen={setOpenRegisterModal}
      />
      <AdminManagementNoticeModifyModal
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
          <div>
            <div>
              {noticeCategory.map((notice) => (
                <span
                  key={notice.id}
                  css={s.categorySpan(
                    searchOption.noticeCategoryId === notice.categoryId
                  )}
                  onClick={() =>
                    setSearchOption((prev) => ({
                      ...prev,
                      noticeCategoryId: notice.categoryId,
                    }))
                  }>
                  {notice.categoryName}
                </span>
              ))}
            </div>
          </div>
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
        {!!noticeResponseBody && (
          <DataTable
            isCheckBoxEnabled={true}
            cols={noticeCols}
            rows={noticeList}
            setSelectedIds={setSelectedIds}
            enabledModify={true}
            onModifyClick={handleModifyOnClick}
          />
        )}

        <PageNation
          page={searchOption.page}
          setPage={setPage}
          size={noticeResponseBody?.size}
          totalElements={noticeResponseBody?.totalElements}
          totalPage={noticeResponseBody?.totalPages}
        />
      </div>
    </div>
  );
}

export default NoticeManagement;
