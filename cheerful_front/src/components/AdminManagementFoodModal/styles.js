import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80rem;
  height: 90vh;
  background-color: #f2f4f8;
`;

export const closeModal = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  box-sizing: border-box;
  width: 100%;
  height: 2rem;
  & > span {
    margin-right: 0.8rem;
    box-sizing: border-box;
    font-size: 2.5rem;
    cursor: pointer;
  }
`;

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

export const registerContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65rem;
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
  margin-top: 1rem;
  border-radius: 1.5rem 1.5rem 0 0;
  width: 100%;
  height: 6.5rem;
  overflow: hidden;
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

  & > input:nth-of-type(2) {
    border-left: 0.1rem solid #dbdbdb;
    padding-left: 1rem;
    width: 18rem;
  }

  input::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

export const imgListContainer = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  padding: 2rem;
  box-sizing: border-box;
  width: 100%;
  height: 12rem;
  background-color: #ffffff;
`;

export const imgContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  box-sizing: border-box;
  border: 0.1rem solid #22222250;
  border-radius: 1rem;
  width: 10rem;
  height: 10rem;
  overflow: hidden;
`;

export const plus = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  & > svg {
    color: #22222260;
    font-size: 5rem;
  }
`;

export const imgBox = (url) => css`
  width: 100%;
  height: 100%;
  background-image: url(${url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &:hover > div {
    opacity: 1;
  }
`;

export const fixButton = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  opacity: 0;

  & > svg {
    margin: 0.5rem;
  }
`;

export const urlAddress = css`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  margin-bottom: 1rem;
  padding: 1rem;
  width: 100%;
  height: 5rem;
  background-color: #ffffff;
  overflow: hidden;

  & > input {
    width: 90%;
    height: 2rem;
    border: none;
    outline: none;
  }
`;

export const registerTextArea = css`
  width: 100%;
  height: 44rem;

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

export const modeButton = css`
  margin-top: 3rem;
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
