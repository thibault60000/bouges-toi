import styled from "styled-components";
import { Pageview } from "styled-icons/material/Pageview";
import { Map } from "styled-icons/boxicons-solid/Map";

const StylePageView = styled(Pageview)`
  height: 3.2rem;
  width: 3rem;
`;
const StyledMap = styled(Map)`
  height: 1.5rem;
`;

const article = styled.li`
  background: white;
  display: flex;
  flex-direction: row;
  position: relative;
  border: 1px solid #ebebeb;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 1.3rem;
  .articleInformations {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    width: 30%;
  }
  .articleMoreInformations {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    width: 40%;
  }
  .actionButtons {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 1px;
    width: 20%;
    /* Enfants du actionButtons */
    & > button {
      background-color: #1c1f36;
      color: #4c546d;
      padding: 1rem;
      font-size: 1.6rem;
      border: 0;
      margin: 0.7rem;
      cursor: pointer;
      border-radius: 5px;
      font-weight: bold;
      text-align: center;
      :hover {
        opacity: 0.8;
      }
      &.join {
        background-color: #ff460f;
        color: #ffffff;
      }
      &.exit {
        background-color: #4d70b9;
        color: #e6e7ea;
      }
    }
    & > button[disabled] {
      background-color: #8c8c8c;
    color: #c3c3c3;
      cursor: default;
      :hover {
        opacity: 1;
      }
    }
    & > a {
      background-color: #454b73;
      color: white;
      padding: 2.3rem 1rem 1rem;
      font-size: 1.6rem;
      border: 0;
      margin: 0.7rem;
      cursor: pointer;
      border-radius: 5px;
      font-weight: bold;
      text-align: center;
      :hover {
        opacity: 0.8;
      }
    }
  }
  p {
    color: #4f5770;
    margin: 0;
    line-height: normal;
  }
  p::first-letter {
    text-transform: capitalize;
  }
  .description {
  }
  .nbPersons {
    background-color: #21253f;
    color: white;
    border-radius: 10px;
    font-weight: bold;
    text-align: center;
    margin: 1.5rem 0 1rem;
    width: 180px;
    display: inline-block;
    padding: 0.4rem 0;
    &.is-full {
      background-color: #d61010;
    }
    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  .adresse {
    color: #ff460f;
    font-weight: bold;
    margin: 1rem 0 0.5rem;
  }
  .price {
    position: absolute;
    top: 1rem;
    right: 2rem;
    color: #673ab7;
    font-weight: bold;
    font-size: 1.6rem;
    font-style: italic;
  }
  .localisation {
    display: inline-block;
    background-color: #ff460f;
    border-radius: 10px;
    color: white;
    width: fit-content;
    padding: 0.2rem 1.5rem;
  }
  .price.notFree {
    background-color: #673ab7;
    padding: 0.3rem 0.9rem;
    color: white;
    height: auto;
    border-radius: 50%;
  }
  .createdEditedBy {
    margin-top: 2rem;
    font-style: italic;
    color: #999;
    & > a {
      color: #ff460f;
    }
  }
  img {
    height: 100%;
    max-width: 200px;
    object-fit: cover;
  }
  .tooltip {
    background-color: white;
    max-width: 500px;
    text-align: center;
    ul {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      padding: 0;
      align-items: center;
      li {
        list-style: none;
        width: 70px;
        height: 70px;
        margin: 0.5rem;
        img {
          border-radius: 4px;
          max-height: 100%;
          max-width: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;

export default article;
export { StylePageView, StyledMap };
