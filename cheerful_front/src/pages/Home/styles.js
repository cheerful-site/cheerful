import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f2f4f8;
  z-index: -2;
`;

export const mainContents = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7.6rem;
  width: 110rem;
  height: 260rem;
  background-color: #ffffff;
  z-index: 0;
`;

export const logoContainer = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div:nth-of-type(1) {
    position: absolute;
    top: 25%;
    left: -1%;
    border: 0.4rem solid #ffc421;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    z-index: -1;
  }

  & > div:nth-of-type(2) {
    position: absolute;
    top: 55%;
    right: -5%;
    border: 0.4rem solid #ffc421;
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
    z-index: -1;
  }
`;

export const logo = css`
  width: 39.2rem;
  height: 19.6rem;
`;

export const serachBarContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;

  & > div:nth-of-type(1) {
    font-size: 4rem;
    font-weight: 800;

    & > span {
      color: #ffc421;
    }
  }

  & > div:nth-of-type(2) {
    margin-top: 1rem;
    margin-bottom: 4rem;
    font-size: 1.6rem;
    color: #22222280;
  }
`;

export const foodInfo = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20rem;
  width: 100%;
  height: 75rem;
  background-color: #ffc42120;
`;

export const imgContainer = css`
  position: absolute;
  top: -10rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 84rem;
  height: 28rem;

  & > img {
    border: 0.4rem solid #ffc421;
    border-radius: 1.5rem;
    width: 25rem;
    height: 28rem;
    background-color: #ffffff;

    &:hover {
      background-color: #ffc421;
    }
  }
`;

export const reviewContainer = css`
  position: absolute;
  bottom: -10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.5rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  width: 94rem;
  height: 52rem;
  background-color: #ffffff;

  & > span {
    margin-top: 6rem;
    font-size: 3.2rem;
  }
`;

export const foodReviewContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 42rem);
  grid-template-rows: repeat(2, 15rem);
  justify-content: center;
  align-content: center;
  margin-top: 5rem;
  gap: 2rem;
  width: 84rem;
  height: 30rem;
`;

export const foodReview = css`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  border: 0.2rem solid #22222230;
  border-radius: 1.5rem;

  & > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
    cursor: pointer;

    & > img {
      border-radius: 1rem;
      width: 12rem;
      height: 12rem;
    }
  }

  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    & > span:nth-of-type(1) {
      margin: 1rem 0;
      height: 5rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & > span:nth-of-type(2) {
      text-align: right;
    }
  }

  & > div:nth-of-type(2) > div {
    display: flex;
    justify-content: space-between;

    & > span:nth-of-type(1) {
      font-size: 1.6rem;
      font-weight: 700;
      color: #222222;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    & > span:nth-of-type(2) {
      font-size: 1.4rem;
      font-weight: 350;
      color: #222222;
    }
  }
`;

export const foodImgContainer = css`
  position: relative;
  display: flex;
  justify-content: space-around;
  margin-top: 20rem;
  width: 94rem;
  height: 28rem;

  & > div {
    display: flex;
    flex-direction: column;
    border-radius: 1.5rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    width: 25rem;
    height: 28rem;

    & > img {
      width: 100%;
      height: 18rem;
      cursor: pointer;
    }
  }

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    color: #ffffff;
    background-color: #ffc421;
  }
`;

export const leftArrow = css`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export const rightArrow = css`
  position: absolute;
  right: -3%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export const foodImgInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
  padding: 1rem 2rem;

  & > span:first-of-type {
    font-size: 1.6rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  & > span:nth-of-type(2) {
    font-size: 1.4rem;
    font-weight: 400;
    color: #22222260;
  }

  & > span:last-of-type {
    text-align: end;
    font-size: 1.2rem;
    font-weight: 400;
    color: #22222280;
  }
`;

export const mapContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
`;

export const mapCategory = css`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.2rem solid #f5f6f8;
    border-radius: 1.5rem;
    width: 11rem;
    height: 4rem;

    &:hover {
      border: 0.2rem solid #ffc421;
      transition: 0.2s ease-in-out;
      color: #ffc421;
      cursor: pointer;
    }
  }

  & > div:nth-of-type(2) {
    margin: 0 10rem;
  }
`;

export const googleMap = css`
  width: 85rem;
  height: 38rem;
  margin-top: 5rem;
  border-radius: 1.5rem;
  background-color: #dbdbdb;
`;
