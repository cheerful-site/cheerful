import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 104rem;
  background-color: #f5f6f8;
`;

export const registerContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8rem 0;
  width: 75rem;
  height: 80rem;
`;

export const registerUser = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.5rem;

  & > img {
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
  }

  & > span {
    margin-left: 1rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #22222280;
  }
`;

export const registerInputTitle = css`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  border-radius: 1.5rem 1.5rem 0 0;
  width: 100%;
  height: 6.5rem;
  background-color: #ffffff;

  & > select {
    margin-left: 6rem;
    width: 10rem;
    height: 100%;
    border: none;
    font-size: 1.6rem;
    color: #22222280;
    outline: none;
  }

  & > input {
    margin-left: 4rem;
    width: 50rem;
    height: 6rem;
    border: none;
    font-size: 1.6rem;
    outline: none;
  }
`;

export const registerTextArea = css`
  width: 100%;
  height: 60rem;

  & > textarea {
    box-sizing: border-box;
    padding: 4rem;
    border: none;
    border-radius: 0 0 1.5rem 1.5rem;
    width: 100%;
    height: 100%;
    font-size: 1.4rem;
    color: #22222260;
    outline: none;
    resize: none;
  }
`;

export const registerButton = css`
  margin-top: 4rem;
  border: none;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
  width: 20rem;
  height: 4rem;
  outline: none;
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #ffc421;
  cursor: pointer;
`;