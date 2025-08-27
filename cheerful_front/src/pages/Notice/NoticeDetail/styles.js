import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f5f6f8;
`;

export const categoryContainer = css`
  margin-top: 8rem;
  margin-bottom: 1rem;
  color: #22222290;

  & > span:nth-of-type(2) {
    margin: 0 0.5rem;
  }
`;

export const postContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.5rem;
  width: 110rem;
  background-color: #ffffff;
`;

export const content = css`
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
  width: 96rem;
`;

export const contentTitle = css`
  border-bottom: 0.15rem solid #22222230;
  margin-bottom: 5rem;
  padding-bottom: 3rem;
  width: 100%;

  & > span {
    font-size: 2rem;
    font-weight: 700;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    & > span {
      color: #22222260;
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
`;

export const contentContainer = css`
  margin: 2rem 0;
`;

export const postLike = css`
  display: flex;
  justify-content: center;
  margin-top: 10rem;
  margin-bottom: 4rem;
  width: 100%;

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.15rem solid #22222230;
    border-radius: 1rem;
    width: 13rem;
    height: 4rem;
    font-weight: 500;
    cursor: pointer;
  }
`;

export const isLike = css`
  border: none;
  background-color: #ffc421;
  color: #ffffff;
`;

export const isDislike = css`
  border: 0.15rem solid #22222250;
  background-color: #ffffff;
  color: #000000;
`;

export const commentsRegister = css`
  box-sizing: border-box;
  border-radius: 1.5rem;
  margin-top: 3rem;
  padding: 3rem;
  width: 110rem;
  height: 24rem;
  background-color: #ffffff;

  & > span:first-of-type {
    font-size: 1.4rem;
    font-weight: 700;
    color: #22222280;
  }
`;

export const imgListContainer = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
  box-sizing: border-box;
  width: 100%;
  height: 5rem;
  background-color: #ffffff;
`;

export const imgContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  box-sizing: border-box;
  border: 0.1rem solid #22222250;
  border-radius: 1rem;
  width: 5rem;
  height: 5rem;
  overflow: hidden;
`;

export const plus = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  & > svg {
    color: #22222260;
    font-size: 3rem;
  }
`;

export const imgBox = (url) => css`
  width: 100%;
  height: 100%;
  background-image: url(${url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &:hover > div {
    opacity: 1;
  }
`;

export const fixButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  opacity: 0;

  & > svg {
    margin: 0.5rem;
  }
`;

export const registerTextArea = css`
  margin-top: 1rem;
  width: 100%;
  height: 8rem;

  & > textarea {
    box-sizing: border-box;
    border: none;
    border-radius: 0 0 1.5rem 1.5rem;
    width: 100%;
    height: 100%;
    font-size: 1.4rem;
    color: #22222260;
    outline: none;
    resize: none;
  }
`;

export const buttonLayout = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const registerButton = css`
  margin-right: 2rem;
  margin-bottom: 2rem;
  border: none;
  outline: none;
  font-size: 1.4rem;
  font-weight: 400;
  color: #22222280;
  background-color: #ffffff;
  cursor: pointer;
`;

export const commentsContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.5rem;
  margin-top: 3rem;
  margin-bottom: 15rem;
  width: 110rem;
  background-color: #ffffff;
`;

export const commentContainer = css`
  padding: 5rem 0;
  width: 96rem;
`;

export const commentUser = css`
  display: flex;
  align-items: center;

  & > img {
    margin-right: 0.5rem;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }

  & > span {
    font-size: 1.4rem;
    font-weight: 700;
    color: #222222;
  }
`;

export const imgAndContent = css`
  padding-left: 3.5rem;

  & > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    & > span {
      font-size: 1.2rem;
      font-weight: 400;
      color: #222222;
    }
  }
`;

export const commentImgList = css`
  margin-top: 2rem;
  width: 55rem;
  height: 10rem;

  & > img {
    margin-right: 0.5rem;
    width: 10rem;
    height: 10rem;
  }
`;
