import { css } from "@emotion/react";

export const global = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

  html {
    font-size: 62.5%;
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
  }

  #root {
    font-size: 1.4rem;
  }
`;
