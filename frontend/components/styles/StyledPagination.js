import styled from "styled-components";

const StyledPagination = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  text-align: center;
  margin: 1.5rem 0;
  border: 1px solid #673ab7;
  border-radius: 3px;
  & > * {
    margin: 0;
    padding: 0.8rem 1.6rem;
    border-right: 1px solid #673ab7;
    &:last-child {
      border-right: 0;
    }
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
  .total {
    color: #673ab7;
    font-weight: bold;
  }
`;

export default StyledPagination;
