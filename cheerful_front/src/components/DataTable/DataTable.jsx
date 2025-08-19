/**@jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { FaRegTrashAlt } from "react-icons/fa";

function DataTable({ isCheckBoxEnabled, cols, rows }) {
  const [newRows, setNewRows] = useState([]);

  console.log(rows);

  useEffect(() => {
    let newRows = [];

    for (let i = 0; i < rows.length; i++) {
      //th 순서 정렬
      const entries = Object.entries(rows[i]);
      let newRow = [];
      for (let j = 0; j < cols.length; j++) {
        for (let k = 0; k < entries.length; k++) {
          const [key, value] = entries[k];
          // console.log(key, value);
          if (cols[j].field === key) {
            newRow = [...newRow, { field: key, value: value }];
          }
        }
      }
      newRows = [...newRows, newRow];
    }
    setNewRows(newRows);
  }, [rows]);

  const handleDeleteOnClick = () => {};

  return (
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
          <th>Del</th>
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
              <td css={s.thAndTd(cols[index].size)}>{row.value}</td>
            ))}
            <td onClick={handleDeleteOnClick}>
              <FaRegTrashAlt />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
