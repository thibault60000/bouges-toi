import styled from "styled-components";

const StyledForm = styled.form`
  background: #454b73;
  margin-top: 2rem;
  border-radius: 5px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
  padding: 0.2rem;
  font-size: 1.5rem;
  color: white;
  line-height: 1.5;
  font-weight: bold;
  h3 {
    font-weight: normal;
    font-size: 3rem;
    margin: 1.3rem 0;
  }
  fieldset {
    border: 0;
    margin: 0;
    &[disabled] {
      opacity: 0.3;
    }
  }
  input:not([type="date"]):not([type="radio"]),
  textarea,
  select {
    display: block;
    width: 75%;
    max-width: 500px;
    padding: 0.1rem 0.8rem;
    font-size: 1.4rem;
    margin-top: 0.3rem;
    line-height: 2.5;
    border: 0;
    border-radius: 2px;
    &:focus {
      outline: 2;
      border-color: black;
    }
  }
  textarea {
    line-height: 1.3;
  }
  input[disabled] {
    background-color: #2c3261;
  }
  select {
    height: 3.9rem;
    color: grey;
    appearance: none;
    cursor: pointer;
    :hover {
      opacity: 0.9;
    }
  }
  input[type="date"] {
    display: block;
    padding: 0.1rem 0.8rem;
    font-size: 1.4rem;
    line-height: 2;
    border: 0;
    border-radius: 2px;
  }
  input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  input[type="file"] + label {
    color: white;
    background-color: #75a500;
    display: block;
    padding: 0.4rem 0.6rem;
    border-radius: 5px;
    width: 250px;
    text-align: center;
    font-weight: bold;
    margin: 2.3rem 0.9rem 1.6rem;
  }
  input[type="file"]:focus + label,
  input[type="file"] + label:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  label.msg {
    margin-left: 0;
  }
  @keyframes changeScaleAnimation {
    from {
      transform: scaleX(1.05);
    }

    to {
      transform: scaleX(0.95);
    }
  }
  .imgLoading {
    color: #75a500;
    font-family: "robotolight";
    margin: 0 1.1rem 2.2rem;
    display: block;
    width: fit-content;
    animation-duration: 1s;
    animation-name: changeScaleAnimation;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .imgProfile {
    border-radius: 50%;
    margin: 0 1.4rem 2.1rem;
    display: block;
    width: 200px;
    object-fit: cover;
    border: 4px solid #75a500;
    height: 200px;
  }
  .imgNormal {
    border-radius: 10px;
    margin: 0 1.4rem 2.1rem;
    display: block;
    width: 200px;
    object-fit: cover;
    border: 4px solid #75a500;
    height: 220px;
  }
  label {
    font-family: "robotolight";
    display: block;
    font-weight: normal;
    margin: 1rem;
    width: 100%;
    font-size: 1.8rem;
  }
  .socialNetwork {
    display: block;
    width: 40%;
    border-radius: 5px;
    margin: 0 1rem 2.8rem;
  }
  .facebookAuth .kep-login-facebook {
    line-height: 1.9;
    display: inline-block;
    width: 300px;
    border-radius: 3px;
    font-family: "Robotolight";
    margin: 1rem 0;
    font-weight: normal;
    text-transform: unset;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    &:hover {
        opacity: 0.8;
    }
  }
  .top-container {
    display: flex;
    padding: 2rem 3rem 0;
    & > div {
      width: 50%;
      & > img {
        height: 250px;
      }
    }
  }
  .googleAuth > div > button {
    width: 300px !important;
    border-radius: 3px !important;
    margin: 1rem 0 !important;
    font-weight: normal !important;
    font-size: 1.5rem !important;
    padding: 0 1rem !important;
    font-family: "Robotolight" !important;
    line-height: 1.5rem !important;
    box-shadow: none !important;
    border: none !important;
  }
  @keyframes changeSkewAnimation {
    from {
      transform: skew(-3deg);
    }

    to {
      transform: skew(-20deg);
    }
  }
  input[type="submit"],
  button[type="submit"] {
    background: #ffffff;
    color: #454b73;
    cursor: pointer;
    font-weight: bold;
    border: 0;
    font-size: 1.8rem;
    border-radius: 5px;
    padding: 1rem 1.7rem;
    margin: 2.2rem 1rem 1rem;
    animation-duration: 0.8s;
    animation-name: changeSkewAnimation;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    &:hover {
      opacity: 0.7;
    }
  }
  button[type="submit"]:disabled{
    background-color: #5d6180;
    color: #4f5373;
    cursor: default;
    pointer-events: none;
    animation: none;
  }
  label.line {
    span:not(.free) {
      text-decoration: line-through;
    }
    span.free {
      margin-left: 0.5rem;
    font-weight: bold;
    font-style: italic;
    color: #75a500;
    font-size: 1.6rem;
    }
  }
`;

export default StyledForm;
