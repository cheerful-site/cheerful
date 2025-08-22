/**@jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { FaRegTrashAlt } from "react-icons/fa";
import PageNation from "../PageNation/PageNation";
import { usePageStore } from "../../stores/usePageStore";
import { LiaEditSolid } from "react-icons/lia";
import { useAdminModalStore } from "../../stores/useAdminModalStore";
import {
  reqAdminOneDeleteCommunity,
  reqAdminOneDeleteUsers,
} from "../../api/adminApi/adminApi";

function DataTable({
  isCheckBoxEnabled,
  cols,
  rows,
  pagenation,
  categoryName,
  categoryId,
  setCategoryId,
  refetch,
  enabledRegisterButton,
  enabledDeleteButton,
  enabledCategoryList,
  categoryList,
  onRegister,
  onDelete,
}) {
  const [newRows, setNewRows] = useState([]);
  const { page, setPage } = usePageStore();
  const { setOpenModal } = useAdminModalStore();
  const [checkedAll, setCheckedAll] = useState(false);

  useEffect(() => {
    let newRows = [];

    for (let i = 0; i < rows?.length; i++) {
      //rows 순서 정렬
      const entries = Object.entries(rows[i]);
      let newRow = [];
      for (let j = 0; j < cols.length; j++) {
        for (let k = 0; k < entries.length; k++) {
          const [key, value] = entries[k];
          // console.log(key, value);
          if (cols[j].field === key) {
            newRow = [...newRow, { field: key, value: value }];
            // console.log(newRow);
          }
        }
      }
      newRows = [...newRows, { checked: false, datas: newRow }];
    }
    setNewRows(newRows);
  }, [rows]);

  useEffect(() => {
    setCheckedAll(!newRows.map((row) => row.checked).includes(false));
  }, [newRows]);

  const handleCheckedAllOnChange = (e) => {
    setCheckedAll(e.target.checked);
    setNewRows((prev) =>
      prev.map((row) => ({
        ...row,
        checked: e.target.checked,
      }))
    );
  };

  const handleCheckedOnChange = (id, e) => {
    setNewRows((prev) =>
      prev.map((row) => {
        if (row.datas[0].value === id) {
          return {
            ...row,
            checked: e.target.checked,
          };
        }
        return row;
      })
    );
  };

  const handleDeleteOnClick = async (id) => {
    if (categoryName === "community") {
      await reqAdminOneDeleteCommunity(id);
      refetch.refetch();
      return;
    }
    if (categoryName === "users") {
      await reqAdminOneDeleteUsers(id);
      refetch.refetch();
      return;
    }
    //단일 삭제 버튼
    // console.log(id);
  };

  const handleModifyOnClick = (id) => {
    setOpenModal(true);
  };

  return (
    <>
      <div css={s.category}>
        <div>
          {enabledCategoryList && (
            <div>
              {categoryList.map((community) => (
                <span
                  key={community.id}
                  css={s.categorySpan(categoryId === community.categoryId)}
                  onClick={() => setCategoryId(community.categoryId)}>
                  {community.categoryName}
                </span>
              ))}
            </div>
          )}
        </div>
        <div css={s.registerAndDel}>
          {enabledRegisterButton && (
            <button
              onClick={() => {
                onRegister();
              }}>
              등록
            </button>
          )}
          {enabledDeleteButton && (
            <button
              onClick={() => {
                onDelete(
                  newRows
                    .filter((row) => row.checked)
                    .map((row) => row.datas[0].value)
                );
              }}>
              삭제
            </button>
          )}
        </div>
      </div>
      <table css={s.manageTable}>
        <thead>
          <tr css={s.TableHeader}>
            {isCheckBoxEnabled && (
              <th>
                <input
                  type="checkbox"
                  checked={checkedAll}
                  onChange={handleCheckedAllOnChange}
                />
              </th>
            )}
            {cols.map((col, index) => (
              <th key={index} css={s.thAndTd(col.size)}>
                {col.label}
              </th>
            ))}
            {categoryName === "food" || categoryName === "notice" ? (
              <th css={s.modifyButton}>Edit</th>
            ) : (
              <th css={s.deleteButton}>Del</th>
            )}
          </tr>
        </thead>
        <tbody>
          {newRows.map((row, index) => (
            <tr key={index} css={s.rows}>
              {isCheckBoxEnabled && (
                <td>
                  <input
                    type="checkbox"
                    id=""
                    checked={row.checked}
                    onChange={(e) =>
                      handleCheckedOnChange(row.datas[0].value, e)
                    }
                  />
                </td>
              )}
              {row.datas.map((data, index) => (
                <td key={index} css={s.thAndTd(cols[index]?.size)}>
                  {data.value}
                </td>
              ))}
              {categoryName === "food" || categoryName === "notice" ? (
                <td
                  css={s.modifyButton}
                  onClick={() => handleModifyOnClick(row.datas[0].value)}>
                  <LiaEditSolid />
                </td>
              ) : (
                <td
                  css={s.deleteButton}
                  onClick={() => handleDeleteOnClick(row.datas[0].value)}>
                  <FaRegTrashAlt />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <PageNation
        page={page}
        setPage={setPage}
        size={pagenation?.size}
        totalElements={pagenation?.totalElements}
        totalPage={pagenation?.totalPages}
      />
    </>
  );
}

export default DataTable;
