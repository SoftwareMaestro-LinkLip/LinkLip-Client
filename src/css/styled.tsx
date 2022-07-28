import styled from '@emotion/styled';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  height: 100vh;
  width: 100%;
  // background-color: #282c34;
`;

export const SearchContainer = styled.div`
  display: flex;
  text-align: center;
  z-index: 10;
  padding: 0.5rem;

  & > form > input {
    border: 1px solid rgb(221, 221, 221);
    border-radius: 9999px;
    // border-top-left-radius: 9999px;
    // border-bottom-left-radius: 9999px;

    overflow: auto;
    width: 12.5rem;
  }

  & > form > button {
    // border: 1px solid rgb(221, 221, 221);
    border-top-right-radius: 9999px;
    border-bottom-right-radius: 9999px;
    // background-color: rgb(37 99 235);
    color: rgb(221, 221, 221);
    padding: 0.125rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.375;

    position: absolute;
    left: 10rem;
    top: 1rem;
  }

  // & > button:hover {
  //   background-color: rgb(29 78 216);
  // }
`;

export const CategoryContainer = styled.div`
  display: flex;
  overflow: scroll;
  border: 1px solid rgb(221, 221, 221);
  padding-left: 0.625rem;

  overflow-y: hidden;
  text-align: center;
  z-index: 10;

  flex: 0 0 auto;
  transition: 0.5s;

  & > span {
    font-size: 1rem /* 12px */;
    line-height: 1rem /* 16px */;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    // vertical-align: baseline;
    font-weight: 700;
    // border-radius: 9999px;
    margin: 0.5rem 0.1rem;
    padding: 0.25rem 0.625rem;
    padding-top: 0.4rem;
  }

  :: -webkit-scrollbar {
    display: none;
  }

  & .selected {
    border-radius: 4px;
    background-color: rgb(37 99 235);
    color: rgb(255 255 255);
  }

  & .non-selected {
    // border: solid rgb(37 99 235);
    color: rgb(37 99 235);
    border-width: 2px;
  }

  & .non-selected:hover {
    background-color: rgb(37 99 235);
    color: rgb(255 255 255);
  }

  & .non-selected:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;
