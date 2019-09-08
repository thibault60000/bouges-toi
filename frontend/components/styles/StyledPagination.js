import styled from "styled-components";
import { LeftArrow } from "styled-icons/boxicons-solid/LeftArrow";
import { RightArrow } from "styled-icons/boxicons-solid/RightArrow";
import { FindInPage } from "styled-icons/material/FindInPage";

const StyledLeftArrow = styled(LeftArrow)`
  height: 1.5rem;
`;

const StyledRightArrow = styled(RightArrow)`
  height: 1.5rem;
`;

const StyledFindInPage = styled(FindInPage)`
  height: 1.5rem;
`;
const StyledPagination = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  text-align: center;
  margin: 1.5rem 0;
  & > * {
    margin: 0;
    padding: 0.8rem 1.6rem;
    margin: 0 0.5rem;
    border-radius: 3px;
  }
  a[aria-disabled="true"] {
    color: #bdbdbd;
    background-color: #f3f3f3;
    pointer-events: none;
  }
  .previous,
  .next {
    background-color: #673ab7;
    color: white;
  }
  .previous :hover,
  .next:hover {
    opacity: 0.8;
  }
  .pageNumber {
    border: 2px solid lightgrey;
    font-weight: bold;
    color: #3D4EDE;
  }
  .total {
    color: #FFC50D;
    border: 2px solid lightgrey;
    font-weight: bold;
  }
`;

export default StyledPagination;
export { StyledLeftArrow, StyledRightArrow, StyledFindInPage };
