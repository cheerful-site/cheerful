import { css } from "@emotion/react";

export const layout = css`
  /* position: absolute;
  top: 0; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  background-color: #22222215;
  z-index: 99;
`;

export const loadingIcon = css`
  height: 30rem;
`;

export const loadingText = css`
  width: 30rem;
`;
