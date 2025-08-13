import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f6f8;
`;

export const adminLoginContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
  width: 35rem;
  height: 40rem;
  background-color: #ffffff;

  & > img {
    margin-bottom: 4rem;
  }

  & > span {
    margin: 2rem 0;
    font-size: 2rem;
    font-weight: 600;
  }

  & > input {
    border: 0.1rem solid #00000025;
    box-sizing: border-box;
    border-radius: 1rem;
    margin-bottom: 1rem;
    padding: 0 2rem;
    width: 22rem;
    height: 3.2rem;
    color: #22222240;
    outline: none;
  }

  & > button {
    margin-top: 2rem;
    border: none;
    border-radius: 1rem;
    width: 22rem;
    height: 4rem;
    background-color: #ffc421;
    color: #ffffff;
    cursor: pointer;
    outline: none;
  }
`;

export const horizon = css`
  border: 0.1rem solid #f2f4f8;
  width: 26rem;
`;
