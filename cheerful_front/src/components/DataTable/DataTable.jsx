/**@jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { FaRegTrashAlt } from "react-icons/fa";
import PageNation from "../PageNation/PageNation";
import { usePageStore } from "../../stores/usePageStore";

function DataTable({ isCheckBoxEnabled, cols, rows, pagenation }) {
  const [newRows, setNewRows] = useState([]);
  const { page, setPage } = usePageStore();

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
      newRows = [...newRows, newRow];
    }
    setNewRows(newRows);
  }, [rows]);

  // console.log(newRows);

  const handleDeleteOnClick = (id) => {
    console.log(id);
  };

  return (
    <>
      <table css={s.manageTable}>
        <thead>
          <tr css={s.TableHeader}>
            {isCheckBoxEnabled && (
              <th>
                <input type="checkbox" name="" id="" />
              </th>
            )}
            {cols.map((col, index) => (
              <th key={index} css={s.thAndTd(col.size)}>
                {col.label}
              </th>
            ))}
            <th css={s.deleteButton}>Del</th>
          </tr>
        </thead>
        <tbody>
          {newRows.map((row, index) => (
            <tr key={index} css={s.rows}>
              {isCheckBoxEnabled && (
                <td>
                  <input type="checkbox" name="" id="" value={row.checked} />
                </td>
              )}
              {row.map((row, index) => (
                <td key={index} css={s.thAndTd(cols[index]?.size)}>
                  {row.value}
                </td>
              ))}
              <td
                css={s.deleteButton}
                onClick={() => handleDeleteOnClick(row[0].value)}>
                <FaRegTrashAlt />
              </td>
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
