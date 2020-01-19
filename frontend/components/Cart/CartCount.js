import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledDotAnimation = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 0.3s;
    backface-visibility: hidden;
  }
  /* état initial */
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;
const Dot = styled.div`
  font-size: 1.1rem;
  background: #4f4949;
  color: white;
  margin-top: -2rem;
  border-radius: 50%;
  padding: 0.4rem;
  line-height: 1.4rem;
  min-width: 2.3rem;
  margin-left: 0.5rem;
  font-family: "robotolight";
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`;

const CartCount = ({ count }) => (
  <StyledDotAnimation>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        key={count}
        timeout={{ enter: 300, exit: 300 }}
      >
        <Dot> {count} </Dot>
      </CSSTransition>
    </TransitionGroup>
  </StyledDotAnimation>
);

export default CartCount;
