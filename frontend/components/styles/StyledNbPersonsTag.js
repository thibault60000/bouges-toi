import styled from "styled-components";

const StyledNbPersonsTag = styled.div`
  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }
  label {
    display: inline-block;
    background-color: #ddd;
    padding: 10px 20px;
    font-family: sans-serif, Arial;
    font-size: 16px;
    border: 2px solid #444;
    border-radius: 4px;
  }
  input[type="radio"]:checked + label {
    background-color: #bfb;
    border-color: #4c4;
  }
  input[type="radio"].error:checked + label {
    background-color: #f57167;
    border-color: #e21708;
  }
  input[type="radio"]:focus + label {
    border: 2px dashed #444;
  }
`;

export default StyledNbPersonsTag;
