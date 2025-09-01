import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f2f4f8;
`;

export const foodContainer = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 1.5rem;
  margin-top: 10rem;
  width: 110rem;
  height: 43rem;
  background-color: #ffffff;
`;

export const foodImgContainer = css`
  & > div:first-of-type > img {
    /* margin-left: 10rem; */
    border-radius: 1rem;
    margin-bottom: 1rem;
    width: 40rem;
    height: 30rem;
  }

  & > div:last-of-type > img {
    border-radius: 1rem;
    margin-right: 1rem;
    width: 5rem;
    height: 5rem;
    cursor: pointer;
  }
`;

export const contentContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 8rem;
  width: 50rem;
  height: 100%;

  & > div:nth-of-type(1) > span {
    font-size: 1.2rem;
    color: #222222;
  }
`;

export const contentLayout = css`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-bottom: 0.15rem solid #22222230;
  width: 100%;
`;

export const contentTitle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > span {
    font-size: 1.6rem;
    font-weight: 700;
    color: #222222;
  }

  & > div > img {
    cursor: pointer;
  }
`;

export const contentUser = css`
  display: flex;
  flex-direction: column;
  & > span {
    font-size: 1.2rem;
    font-weight: 350;
    color: #222222;
  }

  & > span:last-of-type {
    margin: 0.5rem 0;
  }
`;

export const foodPrice = css`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > span {
    margin: 2.5rem 0;
    font-size: 1.8rem;
    font-weight: 700;
    color: #222222;
  }
  & > a {
    width: 22rem;
  }

  & > a > button {
    border: 0.2rem solid #ffc421;
    border-radius: 1rem;
    width: 22rem;
    height: 4rem;
    font-size: 1.4rem;
    font-weight: 900;
    color: #ffc421;
    background-color: #ffffff;
    cursor: pointer;

    &:hover {
      color: #ffffff;
      background-color: #ffc421;
    }
  }
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
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > div:first-of-type {
    display: flex;
    justify-content: center;
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
  }

  & > div:last-of-type {
    & > button {
      padding: 0;
      border: none;
      color: #22222270;
      background-color: #ffffff;
      cursor: pointer;
    }
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

export const likeSelected = css`
  display: flex;
  align-items: center;

  & > span {
    margin-right: 1.5rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #222222;
  }
`;

export const dislike = css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
  border: 0.15rem solid #22222250;
  border-radius: 1rem;
  width: 6rem;
  height: 3rem;
  background-color: #ffffff;
  cursor: pointer;

  & > svg {
    font-size: 1.8rem;
    margin-right: 1rem;
    color: #22222250;
  }

  & > span {
    margin-bottom: 0.1rem;
    font-size: 1.3rem;
    font-weight: 800;
    color: #22222240;
  }
`;

export const like = css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
  border: 0.15rem solid #ffc421;
  border-radius: 1rem;
  width: 6rem;
  height: 3rem;
  background-color: #ffffff;
  cursor: pointer;

  & > svg {
    font-size: 1.8rem;
    margin-right: 1rem;
    color: #ffc421;
  }

  & > span {
    margin-bottom: 0.1rem;
    font-size: 1.3rem;
    font-weight: 800;
    color: #ffc421;
  }
`;
