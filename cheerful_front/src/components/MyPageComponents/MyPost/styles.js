import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const container = css`
  margin: 3rem 0;

  & > div {
    margin-bottom: 1rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: #222222;
  }
`;

export const tableContainer = css`
  width: 75rem;
  height: 100%;
`;

export const headerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0.1rem solid #22222230;
  border-bottom: 0.1rem solid #22222230;
  width: 100%;
  height: 3.5rem;

  & > td {
    font-size: 1.2rem;
    font-weight: 700;
    color: #22222280;
  }

  & > td:nth-of-type(1) {
    width: 10rem;
  }
  & > td:nth-of-type(2) {
    width: 25rem;
  }
  & > td:nth-of-type(3) {
    text-align: center;
    width: 10rem;
  }
  & > td:nth-of-type(4) {
    width: 10rem;
    text-align: center;
  }
  & > td:nth-of-type(5) {
    width: 10rem;
    text-align: center;
  }
`;

export const notpost = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #22222270;
`;

export const tbodyContainer = css`
  width: 100%;
`;

export const bodyContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;

  & > td {
    font-size: 1.2rem;
    font-weight: 400;
    color: #222222;
  }

  & > td:nth-of-type(1) {
    width: 10rem;
  }
  & > td:nth-of-type(2) {
    width: 25rem;
    & > a {
      font-weight: 600;
      color: #222222;
      text-decoration: none;
    }
  }
  & > td:nth-of-type(3) {
    text-align: center;
    width: 10rem;
  }
  & > td:nth-of-type(4) {
    width: 10rem;
    text-align: center;
  }
  & > td:nth-of-type(5) {
    width: 10rem;
    text-align: center;
  }
`;
