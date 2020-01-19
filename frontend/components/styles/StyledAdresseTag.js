import styled from "styled-components";

const StyledAdresseTag = styled.p`
  position: relative;
  display: inline-block;
  margin: 0.5em 0 0;
  input {
    display: inline-block;
    padding: 0.4rem 1.4rem;
    font-family: sans-serif,Arial;
    font-size: 1.6rem;
    border: 2px solid #4f5770;
    border-radius: 4px;
    color: #4f5770;
    margin-right: 0.4rem;
    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #454b73;
      opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #454b73;
    }

    &::-ms-input-placeholder { /* Microsoft Edge */
      color: #454b73;
    }
  }
  .adresseTag {
    display: inline-block;
    position: absolute;
    top: -0.4rem;
    right: -4rem;
    border-radius: 4px;
    opacity: 0;
    padding: 0.3rem 0.5rem;
    background-color: #ff460f;
    color: white;
    &.reveal {
      animation: filter-appear-transition 2s infinite;
    }
    @keyframes filter-appear-transition {
      0% {
        opacity: 0;
      }
      80% {
        top: -1.3rem;
        transform: rotate(-15deg);
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

export default StyledAdresseTag;
