import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
`;

export const pageLeftButton = (isTrue) => css`
  display: ${isTrue ? "none" : "flex"};
  margin: 0 1rem;
  border: none;
  font-size: 2rem;
  outline: none;
  cursor: pointer;
`;

export const pageRightButton = (isTrue) => css`
  display: ${isTrue ? "none" : "flex"};
  margin: 0 1rem;
  border: none;
  font-size: 2rem;
  outline: none;
  cursor: pointer;
`;

export const pageNumberButton = (page) => css`
  border: none;
  font-size: 1.6rem;
  font-weight: 500;
  background-color: #f2f4f8;
  color: #22222230;
  cursor: pointer;

  &:hover {
    color: #000000;
    font-size: 2rem;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[aria-current] {
    color: #222222;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
