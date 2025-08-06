import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 24rem;
  background-color: #282b36;
  color: #ffffff;
`;

export const content = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 128rem;
  height: 4rem;

  & > a {
    padding: 1.2rem 0.8rem 1.2rem 8rem;
    text-decoration: none;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 200;
  }

  & > a:nth-of-type(2),
  a:nth-of-type(3),
  a:nth-of-type(4),
  a:nth-of-type(5) {
    margin-left: 0.8rem;
  }
`;

export const snsContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128rem;
  height: 2.4rem;

  & > a {
    text-decoration: none;
    color: #ffffff;
    font-size: 2.4rem;
  }

  & > a:nth-of-type(2),
  a:nth-of-type(3),
  a:nth-of-type(4),
  a:nth-of-type(5) {
    margin-left: 3rem;
  }
`;

export const company = css`
  margin-bottom: 1rem;
  font-weight: 200;
`;
