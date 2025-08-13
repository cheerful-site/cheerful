import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f2f4f8;
`;

export const noticeTitle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;

  & > div:first-of-type {
    font-size: 4rem;
    font-weight: 500;

    & > span {
      color: #ffc421;
      font-weight: 900;
    }
  }

  & > div:last-of-type {
    margin-top: 1rem;
    font-size: 1.4rem;
    color: #22222280;
  }
`;

export const categoryList = css`
  display: flex;
  justify-content: space-around;
  margin-top: 6rem;
  width: 94rem;
  height: 4rem;
`;

export const horizon = css`
  margin: 5rem 0;
  width: 94rem;
  border: 0.1rem solid #22222230;
`;

export const googleMap = css`
  margin-bottom: 10rem;
  border-radius: 1.5rem;
  width: 93.6rem;
  height: 51rem;
  background-color: #dbdbdb;
`;
