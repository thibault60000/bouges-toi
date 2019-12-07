import styled from "styled-components";

const StyledAdresseTag = styled.p`
  position: relative;
  display: inline-block;
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
