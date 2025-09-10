import { css } from "@emotion/react";

export const layout = css`
  margin: 3rem;

  & > div:first-of-type {
    padding-bottom: 1rem;
    border-bottom: 0.1rem solid #22222230;
    width: 100%;
    font-size: 1.6rem;
    font-weight: 700;
    color: #222222;
  }
`;

export const foodContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-template-rows: repeat(2, 2fr);
  gap: 2rem;
  height: 32rem;
  margin-bottom: 2rem;
`;

export const foodList = css`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  margin-left: 2rem;
`;

export const foodImgContainer = css`
  position: relative;
  margin-right: 2rem;

  & > img:first-of-type {
    border: none;
    border-radius: 1rem;
    width: 12.5rem;
    height: 12.5rem;
    cursor: pointer;
  }

  & > img:last-of-type {
    position: absolute;
    right: 0.5rem;
    bottom: 1rem;
    width: 2.3rem;
  }
`;

export const foodInfoLayout = css`
  width: 100%;
`;

export const foodInfoContainer = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  & > span:nth-of-type(1) {
    font-size: 1.2rem;
    font-weight: 350;
    color: #222222;
  }
  & > span:nth-of-type(2) {
    font-size: 1.6rem;
    font-weight: 700;
    color: #222222;
    cursor: pointer;
  }
  & > span:nth-of-type(3) {
    font-size: 1.4rem;
    font-weight: 400;
    color: #22222260;
  }
`;

export const foodButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: 18rem;
  height: 3.5rem;
  background-color: #ffc421;
  color: #ffffff;
  text-decoration: none;
  text-align: center;
`;
