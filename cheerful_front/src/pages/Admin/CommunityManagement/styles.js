import { css } from "@emotion/react";

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

export const category = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  width: 100%;
`;

export const registerAndDel = css`
  & > button {
    margin: 0 0.5rem;
    border: none;
    outline: none;
    color: #22222250;
    background-color: #ffffff;
    cursor: pointer;
    &:active {
      color: #222222;
    }
  }
`;

export const buttonLayout = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  width: 100%;
`;

export const categorySpan = (categoryId) => css`
  margin: 0 1rem;
  font-size: 1.4rem;
  color: ${categoryId ? "#222222" : "#22222230"};
  cursor: pointer;
`;
