import { css } from "@emotion/react";

export const layout = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.1) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.2) 0px 3px 7px -3px;
  width: 100%;
  height: 8rem;
  z-index: 99;
`;

export const headerLogo = css`
  margin-left: 15rem;
  width: 17rem;
`;

export const category = css`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 30rem;
  width: 54rem;
  height: 12rem;
  font-size: 2rem;
  font-weight: 400;

  & > a:nth-of-type(2),
  a:nth-of-type(3),
  a:nth-of-type(4),
  a:nth-of-type(5) {
    margin-left: 5rem;
  }

  & > a {
    text-decoration: none;
    color: #00000070;
    cursor: pointer;

    &:hover {
      font-weight: 600;
      color: #000000;
    }
  }
`;

export const loginButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15rem;
  border: 0.1rem solid #ffc421;
  border-radius: 1rem;
  width: 10.4rem;
  height: 3.5rem;
  font-size: 1.4rem;
  background-color: #ffffff;
  text-decoration: none;
  color: #ffc421;
  cursor: pointer;
`;

export const profile = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12rem;
  margin-right: 15rem;
`;

export const searchIconBox = css`
  width: 3.2rem;
  height: 3.2rem;
`;

export const searchIcon = css`
  width: 3.2rem;
  height: 3.2rem;
  color: #ffc421;
`;

export const profileImgBox = css`
  margin: 0.5rem 0.5rem 0.5rem 2.5rem;
  width: 3.4rem;
  height: 3.4rem;
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
  margin: 0.5rem;
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
  & > img {
    border-radius: 50%;
    width: 5.8rem;
    height: 5.8rem;
  }
`;

export const modalButton = css`
  display: flex;
  flex-direction: column;
`;

export const horizon = css``;

export const modalContent = css``;
