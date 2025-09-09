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
  margin-bottom: 4rem;
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

export const foodContainer = css`
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  grid-template-rows: repeat(3, 30rem);
  justify-items: center;
  align-items: center;
  margin-top: 4rem;

  & > div > img {
    border-radius: 1rem;
    width: 15rem;
    height: 15rem;
    cursor: pointer;
  }

  & > div > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    & > span:nth-of-type(1) {
      font-size: 1.8rem;
      font-weight: 700;
      &:hover {
        text-decoration: underline;
      }
    }

    & > span:nth-of-type(2),
    span:nth-of-type(3) {
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
`;

export const categoryList = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
  width: 94rem;
  height: 4rem;
`;

export const category = (isSeleted) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid ${isSeleted ? "#ffc421" : "#f5f6f8"};
  box-sizing: border-box;
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

export const searchTextNotFound = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20rem;
  width: 100%;
  height: 50rem;

  & > img {
    width: 55rem;
    height: 46rem;
  }

  & > span {
    font-size: 2.5rem;
    font-weight: 700;
    color: #222222;
  }
`;

export const searchFoodTextNotFound = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
  margin-bottom: 20rem;
  width: 100%;
  height: 50rem;

  & > img {
    width: 55rem;
    height: 46rem;
  }

  & > span {
    font-size: 2.5rem;
    font-weight: 700;
    color: #222222;
  }
`;
