import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f5f6f8;
`;

export const profileContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 3rem;
  margin-top: 9rem;
  border-radius: 1rem;
  width: 25rem;
  height: 40rem;
  background-color: #ffffff;
`;

export const profileImg = css`
  position: relative;
  margin-top: 3.5rem;

  & > img {
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
  }

  & > div {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 0.1rem solid #22222230;
    width: 3rem;
    height: 3rem;
    background-color: #ffffff;

    & > svg {
      font-size: 2rem;
      color: #ffc421;
    }
  }
`;

export const profileInfo = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  & > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center;

    & > span {
      margin-right: 1rem;
      font-size: 2.2rem;
      font-weight: 700;
      color: #222222;
    }

    & > svg {
      font-size: 2.5rem;
    }
  }

  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 3rem;

    & > span:nth-of-type(1) {
      font-size: 1.4rem;
      font-weight: 400;
      color: #22222260;
    }
    & > span:nth-of-type(2) {
      font-size: 1.2rem;
      font-weight: 500;
      color: #22222260;
    }
  }
`;

export const postAndcomment = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  border-top: 0.1rem solid #22222230;
  border-bottom: 0.1rem solid #22222230;
  width: 18rem;

  & > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 1.2rem;
    font-weight: 500;
    color: #22222260;
  }

  & > div:nth-of-type(1),
  div:nth-of-type(2) {
    margin-bottom: 1rem;
  }
`;

export const deleteUser = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  width: 100%;

  & > span {
    font-size: 1rem;
    font-weight: 500;
    color: #22222240;
    cursor: pointer;
  }
`;

export const contentContainer = css`
  margin-top: 9rem;
  width: 82rem;

  & > div {
    border-radius: 1rem;
    margin-bottom: 3rem;
  }
`;

export const postList = css`
  width: 82rem;
  height: 34rem;
  background-color: #ffffff;
`;

export const commentsList = css`
  width: 82rem;
  height: 42rem;
  background-color: #ffffff;
`;

export const likeList = css`
  display: flex;
  flex-direction: column;
  width: 82rem;
  height: 46rem;
  background-color: #ffffff;
`;
