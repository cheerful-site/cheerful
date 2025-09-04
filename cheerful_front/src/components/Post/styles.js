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
  margin: 0 2rem;
  width: 100%;
`;

export const postTitle = css`
  font-size: 1.7rem;
  font-weight: 700;
  color: #222222;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const postContent = css`
  margin: 1rem 0;
  width: 60rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  white-space: normal;
  word-break: keep-all;
  line-height: 1.6;
  max-height: calc(1.6em * 2);
  font-size: 1.4rem;
`;

export const postLike = css`
  display: flex;
  justify-content: space-between;
`;

export const likeAndViews = css`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;

    & > svg {
      margin-right: 0.5rem;
    }
  }
`;
