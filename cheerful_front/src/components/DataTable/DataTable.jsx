/**@jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { FaRegTrashAlt } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import {
  reqAdminOneDeleteCommunity,
  reqAdminOneDeleteUsers,
} from "../../api/adminApi/adminApi";
import { useQueryClient } from "@tanstack/react-query";

function DataTable({
  isCheckBoxEnabled,
  cols,
  rows,
  setSelectedIds,
  enabledModify,
  enabledDelete,
  onModifyClick,
}) {
  const [newRows, setNewRows] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (rows?.length > 0) {
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
      setSelectedIds([]);
    }
  }, [rows]);

  useEffect(() => {
    setCheckedAll(!newRows.map((row) => row.checked).includes(false));
  }, [newRows]);

  useEffect(() => {
    const selectedIds = newRows
      .filter((row) => row.checked)
      .map((row) => row.datas[0].value);
    if (selectedIds.length > 0) {
      setSelectedIds(selectedIds);
    }
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

  const handleDeleteOnClick = async (id, field) => {
    // console.log(id, field);
    if (confirm("삭제 하시겠습니까?")) {
      try {
        if (field === "communityId") {
          await reqAdminOneDeleteCommunity(id);
          queryClient.invalidateQueries({
            queryKey: ["adminCommunity"],
          });
        }
        if (field === "userId") {
          await reqAdminOneDeleteUsers(id);
          queryClient.invalidateQueries({
            queryKey: ["adminUsers"],
          });
        }
      } catch (error) {
        console.log(error);
        alert("데이터를 삭제하지 못하였습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <>
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
            {enabledModify && <th css={s.modifyButton}>Edit</th>}
            {enabledDelete && <th css={s.deleteButton}>Del</th>}
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
              {enabledModify && (
                <td
                  css={s.modifyButton}
                  onClick={() => onModifyClick(row.datas)}>
                  <LiaEditSolid />
                </td>
              )}
              {enabledDelete && (
                <td
                  css={s.deleteButton}
                  onClick={() =>
                    handleDeleteOnClick(row.datas[0].value, row.datas[0].field)
                  }>
                  <FaRegTrashAlt />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DataTable;
