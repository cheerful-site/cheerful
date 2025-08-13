import { css } from "@emotion/react";

export const layout = css`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 80vh;
  background-color: #ffffff;
  z-index: 99;
`;

export const title = css`
  margin-top: 5rem;
  font-size: 9.6rem;
  color: #ffc421;
  font-weight: 700;
`;

export const subTitle = css`
  font-size: 3.2rem;
  font-weight: 700;
`;

export const content = css`
  margin-top: 1rem;
  font-size: 1.4rem;
  font-weight: 400;
  color: #22222250;
`;

export const homeButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  margin-top: 10rem;
  width: 20rem;
  height: 4rem;
  font-weight: 900;
  background-color: #ffc421;

  & > a {
    text-decoration: none;
    color: #ffffff;
  }
`;
