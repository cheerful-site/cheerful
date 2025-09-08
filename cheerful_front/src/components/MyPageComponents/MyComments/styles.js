import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const container = css`
  margin-top: 2rem;
  width: 75rem;

  & > div:first-of-type {
    margin-bottom: 2rem;
    font-size: 1.8rem;
    font-weight: 700;
    color: #222222;
  }
`;

export const commentContainer = css`
  border-top: 0.1rem solid #22222230;
  padding: 1rem 0;
  width: 75rem;

  & > a {
    color: #222222;
    text-decoration: none;
  }

  & > div:nth-of-type(1) {
    margin-bottom: 0.2rem;
    font-size: 1rem;
    font-weight: 400;
    color: #22222280;
  }
  & > div:nth-of-type(2) {
    font-size: 1.2rem;
    font-weight: 500;
    color: #22222280;
  }
  & > div:nth-of-type(3) {
    margin: 0.5rem 0;
    font-size: 1.4rem;
    font-weight: 500;
    color: #222222;
  }
  & > div:nth-of-type(4) {
    font-size: 1.2rem;
    font-weight: 400;
    color: #22222260;
  }
`;
