import styled from "styled-components";

const StyledRadioRubriques = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  grid-gap: 3rem;
  height: 18rem;

  input[type="radio"] {
    position: asbolute;
    left: -9999px;
    opacity: 0;
  }
  label {
    height: 10rem;
    width: 10rem;
    background-size: cover;
    position: relative;
    cursor: pointer;
  }
  label span {
    display: block;
    position: absolute;
    top: 11.8rem;
    line-height: 1.3rem;
    overflow: hidden;
    font-size: 1.3rem;
    text-align: center;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-overflow: ellipsis;
  }
  input[type="radio"]:checked + label {
    border: 3px solid #673ab7;
    color: #673ab7;
    border-radius: 5px;
  }
`;

export default StyledRadioRubriques;