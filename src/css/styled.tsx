import styled from '@emotion/styled';

export const SearchContainer = styled.form`
  display: flex;
  text-align: center;
  z-index: 10;
`;

export const CategoryContainer = styled.div`
  display: flex;
  overflow: scroll;

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
    vertical-align: baseline;
    font-weight: 700;
    border-radius: 9999px;
    margin: 0.25rem;
    padding: 0.25rem 0.625rem;
  }

  :: -webkit-scrollbar {
    display: none;
  }

  & .selected {
    background-color: rgb(37 99 235);
    color: rgb(255 255 255);
  }

  & .non-selected {
    border: solid rgb(37 99 235);
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
