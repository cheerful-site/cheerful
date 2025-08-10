import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 136rem;
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

export const category = (isSeleted) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid ${isSeleted ? "#ffc421" : "#f5f6f8"};
  border-radius: 1rem;
  width: 10rem;
  height: 4rem;
  color: ${isSeleted ? "#ffc421" : "#222222"};
  background-color: #ffffff;
  text-decoration: none;
`;

export const noticePostContainer = css`
  margin: 4rem 0;
  width: 94rem;
`;

export const noticePost = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: center;
  padding: 2rem 0;
  border-top: 0.15rem solid #22222230;
  width: 100%;
  height: 3rem;
`;
