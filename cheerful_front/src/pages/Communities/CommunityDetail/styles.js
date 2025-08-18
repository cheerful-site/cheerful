import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f5f6f8;
`;

export const categoryContainer = css`
  margin-top: 8rem;
  margin-bottom: 1rem;
  color: #22222290;

  & > span:nth-of-type(2) {
    margin: 0 0.5rem;
  }
`;

export const postContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.5rem;
  width: 110rem;
  height: 220rem;
  background-color: #ffffff;
`;

export const content = css`
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
  width: 96rem;
`;

export const contentTitle = css`
  border-bottom: 0.15rem solid #22222230;
  margin-bottom: 5rem;
  padding-bottom: 3rem;
  width: 100%;

  & > span {
    font-size: 2rem;
    font-weight: 700;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    & > span {
      color: #22222260;
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
`;

export const postLike = css`
  display: flex;
  justify-content: center;
  margin-top: 10rem;
  width: 100%;
  cursor: pointer;

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.15rem solid #22222230;
    border-radius: 1rem;
    width: 13rem;
    height: 4rem;
    font-weight: 500;
  }
`;
