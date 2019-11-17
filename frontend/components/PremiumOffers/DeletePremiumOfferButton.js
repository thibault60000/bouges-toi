import React, { Component } from "react";
import styled from "styled-components";
import { Delete } from "styled-icons/material/Delete";

const StyledDeleteIcon = styled(Delete)`
  height: 1.7rem;
  margin-top: -0.1rem;
`;

const StyledDeletePremiumOfferbutton = styled.button`
    position: absolute;
    right: 0;
    bottom: -4.2rem;
    border: none;
    padding: 0.6rem 1.4rem;
    background-color: #607d8b;
    color: white;
    border-radius: 2px;
    font-size: 1.8rem;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
`;
export default class DeletePremiumOfferButton extends Component {
  render() {
    return <StyledDeletePremiumOfferbutton> <StyledDeleteIcon /> <span>{this.props.children}</span></StyledDeletePremiumOfferbutton>;
  }
}
