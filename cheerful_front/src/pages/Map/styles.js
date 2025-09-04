import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f2f4f8;
`;

export const mapTitle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;

  & > div:first-of-type {
    font-size: 4rem;
    font-weight: 500;

    & > span {
      color: #ffc421;
      font-weight: 900;
    }
  }

  & > div:last-of-type {
    margin-top: 1rem;
    font-size: 1.4rem;
    color: #22222280;
  }
`;

export const categoryList = css`
  display: flex;
  justify-content: space-around;
  margin-top: 6rem;
  width: 94rem;
  height: 4rem;
`;

export const horizon = css`
  margin: 5rem 0;
  width: 94rem;
  border: 0.1rem solid #22222230;
`;

export const googleMap = css`
  margin-bottom: 10rem;
  border-radius: 1.5rem;
  width: 93.6rem;
  height: 51rem;
  background-color: #dbdbdb;
`;

export const infoCard = css`
  padding: 1.2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  width: 26rem;
  background-color: #ffffff;
`;

export const address = css`
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: #222222;
`;

export const phoneNumber = css`
  font-size: 1.3rem;
  color: #222222;
`;

export const operationTime = css`
  margin-top: 0.5rem;
  font-size: 1.3rem;
`;

export const breakTime = css`
  margin-top: 0.1rem;
  font-size: 1.3rem;
  color: #222222;
`;

export const fullTime = css`
  font-size: 1.4rem;
  color: #0a7;
`;

export const content = css`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #ba533c;
`;

export const infoCardTitle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  & > div {
    font-size: 1.5rem;
    font-weight: 700;
  }

  & > button {
    border: none;
    background-color: transparent;
    font-size: 1.6rem;
    cursor: pointer;
  }
`;
