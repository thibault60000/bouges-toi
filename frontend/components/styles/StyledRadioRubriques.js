import styled from "styled-components";

const StyledRadioRubriques = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: -2rem;
  margin-bottom: 2.4rem;
  & > p {
    width: 130px;
    text-align: center;
  }
  input[type="radio"] {
    position: absolute;
    left: -9999px;
    opacity: 0;
  }
  label {
    height: 10rem;
    width: 10rem;
    background-size: cover;
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    :hover {
      opacity: 0.8;
    }
  }
  label span {
    display: block;
    position: absolute;
    top: 11.9rem;
    line-height: 1.5rem;
    overflow: hidden;
    font-size: 1.3rem;
    text-align: center;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 3rem;
    text-overflow: ellipsis;
    color: white;
  }
  input[type="radio"]:checked + label {
    border: 3px solid #75a500;
    border-radius: 5px;
    & > span {
      color: #75a500;
    }
  }
`;

export default StyledRadioRubriques;
