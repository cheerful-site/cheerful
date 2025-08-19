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
`;
export const profileImg = css`
  border-radius: 50%;
  width: 3.4rem;
  height: 3.4rem;
  background-color: #dbdbdb;
`;

export const profileEdit = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 2rem 0.5rem 0.5rem;
  border-radius: 1rem;
  width: 14rem;
  height: 3.5rem;
  background-color: #ffc421;
  color: #ffffff;
  cursor: pointer;
`;

export const modalContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 1.5rem;
  width: 32rem;
  height: 34rem;
`;

export const modalProfile = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  & > img {
    border-radius: 50%;
    width: 5.8rem;
    height: 5.8rem;
  }

  & > span {
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
`;

export const modalButton = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > a,
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    width: 22rem;
    height: 4rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
    text-decoration: none;
    background-color: #ffc421;
    cursor: pointer;
  }
`;

export const horizon = css`
  margin: 1rem 0;
  width: 22rem;
  border: 0.1rem solid #22222230;
`;

export const modalContent = css`
  margin-bottom: 2rem;
  width: 22rem;
  font-size: 1.2rem;
  color: #00000080;

  & > div {
    display: flex;
    justify-content: space-between;
  }

  & > div > span:nth-of-type(2) {
    color: #000000;
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

