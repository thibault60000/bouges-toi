import styled from "styled-components";

const StyledNbPersonsTag = styled.div`
  margin-top: 1rem;
  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }
  label {
    display: inline-block;
    padding: 0.4rem 1.4rem;
    font-family: sans-serif, Arial;
    font-size: 1.6rem;
    border: 2px solid #4f5770;
    border-radius: 4px;
    font-weight: bold;
    color: #4f5770;
    margin-right: 0.4rem;
    :hover {
      cursor: pointer;
    }
  }
  input[type="radio"]:focus + label {
    border: 2px solid #d9501e;
    background-color: #d9501e;
    color: white;
  }
`;

export default StyledNbPersonsTag;
