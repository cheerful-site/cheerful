import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f6f8;
`;

export const manageContainer = css`
  display: flex;
  border-radius: 1.5rem;
  width: 150rem;
  height: 80rem;
  background-color: #ffffff;
`;

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

  & > img {
    width: 10rem;
    height: 3.5rem;
  }
`;

export const categoryUser = css`
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

  & > div > div {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    border-radius: 0.5rem;
    width: 16rem;
    height: 3rem;
    background-color: #ffc42140;

    & > svg {
      margin-left: 1rem;
      width: 2.3rem;
      height: 2.3rem;
      color: #ffc421;
    }

    & > span {
      margin-left: 0.5rem;
      font-size: 1.6rem;
      font-weight: 700;
      color: #ffc421;
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

  & > div > div {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    border-radius: 0.5rem;
    width: 16rem;
    height: 3rem;
    background-color: #ffc42140;

    & > svg {
      margin-left: 1rem;
      width: 2.3rem;
      height: 2.3rem;
      color: #ffc421;
    }

    & > span {
      margin-left: 0.5rem;
      font-size: 1.6rem;
      font-weight: 700;
      color: #ffc421;
    }
  }
`;

export const manageLayout = css`
  width: 100%;
`;

export const manageUser = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 0.1rem solid #22222230;
  width: 100%;
  height: 7rem;

  & > img {
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
  }

  & > span {
    margin-left: 0.5rem;
    margin-right: 6rem;
    border-radius: 1rem;
    width: 14rem;
    height: 3.5rem;
    text-align: center;
    align-content: center;
    color: #ffffff;
    background-color: #ffc421;
  }
`;

export const manageContent = css`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 73rem;
`;

export const manageSearch = css`
  position: relative;

  & > input {
    box-sizing: border-box;
    border: 0.15rem solid #22222230;
    border-radius: 1rem;
    margin-bottom: 2rem;
    padding-left: 5rem;
    width: 55rem;
    height: 4rem;
    outline: none;
  }

  & > svg {
    position: absolute;
    top: 35%;
    left: 2%;
    transform: translate(-50%, -50%);
    width: 2rem;
    height: 2rem;
    color: #22222230;
  }
`;

export const manageTable = css`
  display: flex;
  box-sizing: border-box;
  border: 0.1rem solid #dde1e6;
  border-radius: 1rem;
  width: 100rem;
  height: 50rem;
`;
