import { css } from "@emotion/react";

export const manageTable = css`
// 테이블 디자인 ||||
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 0.1rem solid #dde1e6;
  border-radius: 1rem;
  width: 110rem;
  height: 54rem;
`;

export const TableHeader = css`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 4.8rem;
  background-color: #dde1e6;

  & > th {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0;
    height: 4.8rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #222222;
  }

`;

export const thAndTd = (size) => css`
  width: ${size};
`

export const rows = css`
  display: flex;
  align-items: center;

  & > td {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0;
    height: 4.8rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #222222;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

`;
