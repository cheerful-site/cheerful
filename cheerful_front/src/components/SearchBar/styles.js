import { css } from "@emotion/react";

export const searchBar = css`
  position: relative;

  & > svg {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    color: #ffc421;
  }

  & > input {
    border: 0.4rem solid #ffc421;
    border-radius: 6.5rem;
    padding: 1.2rem 1.6rem 1.2rem 12rem;
    width: 60rem;
    height: 4rem;
    outline: none;
    font-size: 2.5rem;
  }

  & > input::placeholder {
    color: #22222250;
  }
`;
