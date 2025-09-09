import { css } from "@emotion/react";

export const manageCategory = css`
  display: flex;
  flex-direction: column;
  border-right: 0.1rem solid #22222230;
  box-sizing: border-box;
  width: 20rem;
  height: 100%;
`;

export const logoContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 7rem;

  & > a > img {
    width: 10rem;
    height: 3.5rem;
  }
`;

export const categoryUser = (isSeleted) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  box-sizing: border-box;
  width: 100%;

  & > div > span {
    margin-left: 1rem;
    width: 16rem;
    height: 3rem;
    font-size: 1.8rem;
    color: #22222260;
  }

  & > div > a {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    border-radius: 0.5rem;
    width: 16rem;
    height: 3rem;
    background-color: ${isSeleted ? "#ffc42140" : "#ffffff"};
    text-decoration: none;
    & > svg {
      margin-left: 1rem;
      width: 2.3rem;
      height: 2.3rem;
      color: ${isSeleted ? "#ffc421" : "#22222260"};
    }

    & > span {
      margin-left: 0.5rem;
      font-size: 1.6rem;
      font-weight: 700;
      color: ${isSeleted ? "#ffc421" : "#22222260"};
    }
  }
`;

export const categoryAdmin = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;

  & > div > span {
    margin-left: 1rem;
    width: 16rem;
    height: 3rem;
    font-size: 1.8rem;
    color: #22222260;
  }
`;

export const adminLink = (isSeleted) => css`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  border-radius: 0.5rem;
  width: 16rem;
  height: 3rem;
  text-decoration: none;
  background-color: ${isSeleted ? "#ffc42140" : "#ffffff"};

  & > svg {
    margin-left: 1rem;
    width: 2.3rem;
    height: 2.3rem;
    color: ${isSeleted ? "#ffc421" : "#22222260"};
  }

  & > span {
    margin-left: 0.5rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${isSeleted ? "#ffc421" : "#22222260"};
  }
`;
