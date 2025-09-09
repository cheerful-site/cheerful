import { css } from "@emotion/react";

export const category = (isSeleted) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid ${isSeleted ? "#ffc421" : "#f5f6f8"};
  border-radius: 1rem;
  width: 10rem;
  height: 4rem;
  color: ${isSeleted ? "#ffc421" : "#222222"};
  background-color: #ffffff;
  text-decoration: none;
`;
