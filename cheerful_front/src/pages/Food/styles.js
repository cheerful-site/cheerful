import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f4f8;
`;

export const foodTitle = css`
  text-align: center;

  & > h1 {
    font-size: 4rem;
    font-weight: 500;

    & > span {
      font-weight: 900;
      color: #ffc421;
    }
  }

  & > h3 {
    font-size: 1.4rem;
    font-weight: 400;
    color: #22222280;
  }
`;
