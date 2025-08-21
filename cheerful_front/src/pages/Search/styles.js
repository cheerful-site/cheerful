import { css } from "@emotion/react";

export const layout = (searchWord) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${searchWord ? "" : "66vh"};
  background-color: #f5f6f8;

  & > div:first-of-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 8rem;
    & > span {
      font-size: 2rem;
      color: #22222250;
    }
  }
`;

export const communityOrFood = (isSelected) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6rem;
  width: 94rem;

  & > div {
    flex-grow: 1;
    font-size: 1.8rem;
    font-weight: 500;
    text-align: center;
  }

  & > div:first-of-type {
    border-bottom: 0.2rem solid ${isSelected ? "#222222" : "#22222230"};
    color: ${isSelected ? "#222222" : "#22222230"};
    cursor: pointer;
  }

  & > div:last-of-type {
    border-bottom: 0.2rem solid ${isSelected ? "#22222230" : "#222222"};
    color: ${isSelected ? "#22222230" : "#222222"};
    cursor: pointer;
  }
`;

export const categoryList = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rem;
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
  cursor: pointer;
`;

export const searchResult = css`
  margin-bottom: 7rem;
`;
