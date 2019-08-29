import styled from "styled-components";

const StyledTable = styled.table`
  border-spacing: 0;
  font-size: 1rem;
  border: 1px solid lightgrey;
  thead {
    font-size: 1.3rem;
  }
  td,
  th {
    border-bottom: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
    padding: 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      padding: 10px 5px;
      display: block;
    }
  }
  tr {
    &:hover {
      background: lightgrey;
    }
  }
`;

export default StyledTable;
