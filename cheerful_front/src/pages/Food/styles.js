import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f4f8;
`;

export const foodTitle = css`
  width: 93.6rem;
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

export const horizon = css`
  margin: 4rem 0;
  width: 94rem;
  border: 0.1rem solid #22222230;
`;

export const foodSort = css`
  display: flex;
  align-items: center;
  width: 93.6rem;
`;

export const dot = css`
  margin: 0 1rem;
  border: 0.2rem solid #22222250;
`;

export const foodContainer = css`
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  grid-template-rows: repeat(4, 30rem);
  justify-items: center;
  align-items: center;
  margin-top: 4rem;

  & > div > img {
    width: 20rem;
    height: 20rem;
  }

  & > div > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > span:nth-of-type(1) {
      font-size: 1.8rem;
      font-weight: 700;
    }

    & > span:nth-of-type(2),
    span:nth-of-type(3) {
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
`;
