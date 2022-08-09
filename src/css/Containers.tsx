import styled from '@emotion/styled';

export const DashboadContainer = styled.div`
  @media (min-width: 300px) {
    display: grid;
    grid-template-columns: 20% 1fr;
    grid-template-areas: 
      'header header';
      'sidebar contents';

    & > header {
      grid-area: header;
    }

    & > aside {
      grid-area: sidebar;
      // margin-top: 3rem;
    }

    & > div {
      // margin-top: 3rem;
      gird-area: contents;
    }
  }

  display: grid;
  height: 100vh;
  width: 100%;
  // background-color: #282c34;
`;

export const HeaderContainer = styled.header`
  display: flex;
  text-align: center;
  z-index: 10;
  padding: 0.5rem;
  // position: absolute;
  width: 100%;

  & > form > input {
    border: 1px solid rgb(221, 221, 221);
    border-radius: 9999px;
    // border-top-left-radius: 9999px;
    // border-bottom-left-radius: 9999px;

    // overflow: auto;
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
`;

export const SidebarContainer = styled.aside`
  background-color: #282c34;
`;

export const CategoryContainer = styled.div`
  display: flex;
  overflow: scroll;
  border: 1px solid rgb(221, 221, 221);
  padding-left: 0.625rem;
  margin-top: 4rem;

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
    border-radius: 4px;
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

export const ContentsContainer = styled.div`
  margin-top: 4rem;
  z-index: 5;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, auto));

  row-gap: 0.5rem;
  column-gap: 0.5rem;

  // align-items: stretch;
  // min-width: 80%;
  // z-index: 2;
  // overflow: scroll;
  overflow-x: hidden;
  // padding: 0.5rem;

  // flex: 1 1 auto;

  & > div {
    border-radius: 0.375rem;
    background-opacity: 0.5;
    color: rgb(55 65 81);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 1rem 1rem;
    max-height: 10rem;
    min-heihgt: 15rem;

    display: flex;
    overflow: hidden;
  }

  & > div > a > img {
    max-height: 6rem;
    // display: block;
    // margin: 0px auto;
    // padding-bottom: 60%;
    background-repeat: no-repeat;
    background-position: center;
    // background-size: cover;
  }
`;

export const NoteContainer = styled.div`
  // z-index: 10;
  // position: fixed;
  // bottom: 0;
  display: flex;
  width: 100%;
  // padding: 1rem 1rem;
  // padding-top: 0;
  // border-radius: 4px;

  & > form {
    color: rgb(29, 28, 29);
    //   font-size: 15px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid rgb(221, 221, 221);
    background-color: rgb(221, 221, 221);
  }

  & > form > textarea {
    width: 100%;
    border: 1px solid rgb(221, 221, 221);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    resize: none;

    outline: none;
    box-shadow: none;
    overflow: hidden;
    // margin: 0;
  }
`;
