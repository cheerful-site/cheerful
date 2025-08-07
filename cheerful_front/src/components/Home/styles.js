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
    margin-top: 8rem;
    font-size: 3.2rem;
  }
`;
