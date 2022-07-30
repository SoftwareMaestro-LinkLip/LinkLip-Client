import styled from '@emotion/styled';

export const ToolArea = styled.div`
  position: relative;
  background: rgb(248, 248, 248);
  height: 41px;
  display: flex;
  border-top: 1px solid rgb(221, 221, 221);
  align-items: center;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  & > button {
    position: absolute;
    right: 5px;
    top: 5px;
    padding: 0.3rem 0.5rem;
    color: rgb(28, 29, 28);
  }
`;
export const EachMention = styled.button<{ focus: boolean }>`
  padding: 4px 20px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: rgb(28, 29, 28);
  width: 100%;

  & img {
    margin-right: 5px;
  }

  ${({ focus }) =>
    focus &&
    `
    background: #1264a3;
    color: white;
  `};
`;
