import styled, { keyframes } from "styled-components";
import { Search } from "styled-icons/boxicons-regular/Search";

const StyledSearchIcon = styled(Search)`
  width: 2rem;
`;
const StyledDropdownArticle = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid lightgrey;
`;

const StyledDropdownArticleItem = styled.div`
  border-bottom: 1px solid lightgrey;
  background: ${props => (props.highlighted ? "#f7f7f7" : "white")};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? "padding-left: 2rem;" : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${props => (props.highlighted ? "lightgrey" : "white")};
  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }
  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const StyledDropdownArticleSearch = styled.div`
    width: 95%;
    display: inline-block;
  div[role="combobox"] {
    position: relative;
  }
  input {
    outline: none;
    width: 100%;
    padding: 0.9rem 1.8rem;
    font-size: 1.9rem;
    border: 2px solid #d9501e;
    border-radius: 10rem;
    margin-bottom: 1rem;
    color: #d9501e;
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
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
  .inputIcon {
    position: absolute;
    display: block;
    background-color: #d9501e;
    width: 3.6rem;
    height: 3.6rem;
    top: 0.4rem;
    padding-top: 0.6rem;
    right: 0.6rem;
    border-radius: 50%;
    color: white;
    font-size: 1.4rem;
    text-align: center;
  }
`;

export {
  StyledDropdownArticle,
  StyledDropdownArticleItem,
  StyledDropdownArticleSearch,
  StyledSearchIcon
};
