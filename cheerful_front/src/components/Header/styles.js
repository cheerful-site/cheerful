import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 8rem;
  -webkit-box-shadow: 0 10px 6px -6px #777;
  -moz-box-shadow: 0 10px 6px -6px #777;
  box-shadow: 0 10px 6px -6px #77777740;
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
  color: #ffc421;
  cursor: pointer;

  & > a {
    text-decoration: none;
    color: #ffc421;
  }
`;

export const profile = css`
  position: relative;
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

export const profileImg = css`
  margin-left: 3rem;
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
`;
