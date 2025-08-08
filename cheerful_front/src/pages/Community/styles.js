import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f4f8;
`;

export const communityTitle = css`
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
  justify-content: space-between;
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

export const horizon = css`
  margin-top: 5rem;
  width: 94rem;
  border: 0.1rem solid #22222230;
`;

export const postContainer = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  margin: 5rem 0;
  width: 84rem;
  gap: 4.5rem;
`;

export const contentContainer = css`
  border-radius: 1.5rem;
  margin: 2rem 0;
  width: 100%;
  height: 28rem;
  background-color: #ffffff;

  & > img {
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    width: 100%;
    height: 18rem;
  }
`;

export const postContent = css`
  padding: 0 2rem;
  & > h3 {
    margin: 0;
    font-size: 1.6rem;
  }

  & > p {
    display: inline-block;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > h4 {
    margin: 0;
  }
`;
