import styled from "styled-components";

const StyledCart = styled.div`
  position: relative;
  background: white;
  position: fixed;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 20px;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 15;
  ${props => props.open && `transform: translateX(0);`};
  .previous-btn {
    padding: 0.3rem 1.1rem;
    border: none;
    color: #454b73;
    font-weight: bold;
    background: initial;
    box-shadow: 1px 1px 2px 1px #454b73;
    svg,
    span {
      display: inline-block;
      vertical-align: middle;
      font-size: 1.8rem;
      line-height: 2.2rem;
      height: 2.2rem;
    }
    &:hover {
      background-color: #454b73;
      color: white;
      cursor: pointer;
    }
  }
  h3 {
    color: #454b73;
    strong {
      font-weight: bold;
    }
  }
  p.cart-counter {  
    color: #ff460f;
    strong {
      font-weight: bold;
    }
  }
  header {
    border-bottom: 5px solid #454b73;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  footer {
    border-top: 5px solid #454b73;
    margin-top: 2rem;
    padding-top: 2rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow-y: auto;
  }
`;

export default StyledCart;
