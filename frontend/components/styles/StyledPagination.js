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
    color: #d9501e;
    background-color: #ffffff;
    border: 2px solid #d9501e;
    border-radius: 2px;
    padding: 0.2rem 0.5rem;
    height: 3.5rem;
    display: inline-block;
    align-self: center;
    justify-self: center;
    margin-right: 0.4rem;
    :hover {
      cursor: pointer;
    }
  }
  a[aria-disabled="true"] {
    color: #bdbdbd;
    background-color: #f3f3f3;
    border: 2px solid #f3f3f3;
    pointer-events: none;
  }
  .previous,
  .next {
    color: #4f5770;
    font-weight: bold;
  }
  .previous :hover,
  .next:hover {
    background-color: #d9501e;
    color: white;
  }
  .pageNumber {
    border: 2px solid #d9501e;
    font-weight: bold;
    color: #d9501e;
  }
  .total {
    color: #d9501e;
    border: 2px solid #d9501e;
    font-weight: bold;
  }
`;

export default StyledPagination;
export { StyledLeftArrow, StyledRightArrow, StyledFindInPage };
