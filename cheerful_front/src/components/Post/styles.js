import { css } from "@emotion/react";

export const postLayout = css`
  display: flex;
  align-items: center;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
  width: 93rem;
  height: 16rem;
  background-color: #ffffff;
`;

export const postImg = css`
  margin-left: 2rem;
  border-radius: 1rem;
  width: 11rem;
  height: 11rem;
  cursor: pointer;
`;

export const postContainer = css`
  display: flex;
  flex-direction: column;
  margin: 0 4rem;
  width: 100%;
  height: 11rem;
`;

export const postTitle = css`
  font-size: 1.6rem;
  font-weight: 700;
  color: #222222;
  cursor: pointer;
`;

export const postContent = css`
  width: 70rem;
  height: 6rem;
  overflow: hidden;
`;

export const postLike = css`
  display: flex;
  justify-content: space-between;

  & > div > span:first-of-type {
    margin-right: 2rem;
  }
`;
