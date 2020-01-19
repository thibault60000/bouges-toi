import styled from "styled-components";
import { Pageview } from "styled-icons/material/Pageview";
import { Map } from "styled-icons/boxicons-solid/Map";
import { Time } from "styled-icons/boxicons-solid/Time";

const StylePageView = styled(Pageview)`
  height: 3.2rem;
  width: 3rem;
`;
const StyledMap = styled(Map)`
  height: 1.5rem;
`;

const StyledArticlesContainer = styled.div`
  h3 {
    margin: 0.3rem 0 0.1rem;
    &.location {
      margin: 0.9rem 0 0.1rem;
    }
  }
`;
const StyledCritereChoice = styled.p`
  span {
    color: #d9501e;
    font-weight: bold;
    vertical-align: middle;
    margin: 0.3rem 0;
  }
  strong,
  button {
    vertical-align: middle;
  }
  strong {
    text-decoration: underline;
  }
`;
const StyledArticlesList = styled.ul`
  display: grid;
  margin: 0;
  grid-template-rows: repeat(6, 275px);
  grid-gap: 40px;
  padding-left: 0.4rem !important;
  li {
    list-style: none;
  }
`;

const StyledClearFilterBtn = styled.button`
  border: none;
  margin-left: 0.6rem;
  background: initial;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid lightgrey;
  padding: 0.2rem 0.5rem;
  :hover {
    > svg {
      color: lightgrey;
    }
  }
`;

const StyledPageSlogan = styled.p`
  font-weight: bold;
  font-size: 2.5rem;
  color: #4f5770;
  margin: 2.4rem 0 0 0;
`;

const StyledTimeIcon = styled(Time)`
  height: 2.5rem;
`;

const article = styled.li`
  background: white;
  position: relative;
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  max-width: 100%;
  width: 100%;
  :hover {
    box-shadow: 0px 1px 10px 3px rgba(0, 0, 0, 0.52);
    cursor: pointer;
  }
  .firstInformations {
    display: flex;
    flex-direction: row;
    img {
      width: 11rem;
      object-fit: cover;
      height: 11rem;
      border-radius: 3px;
    }
    .articleInformations {
      display: flex;
      flex-direction: column;
      padding: 0.5rem 1rem;
      width: calc(70% - 2rem);
      height: calc(11rem - 1rem);
    }
    h4 {
      font-size: 1.8rem;
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      color: #4f5770;
      text-transform: uppercase;
      padding: 0;
    }
    p.description {
      color: #4f5770;
      margin: 0.5rem 0 0;
      font-size: 1.3rem;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 1.3rem;
    }
    p.nbPersons {
      background-color: #21253f;
      color: white;
      border-radius: 3px;
      text-align: center;
      margin: 0.5rem 0;
      display: inline-block;
      width: fit-content;
      padding: 0.2rem 1.6rem;
      &.is-full {
        background-color: #d61010;
      }
      :hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
  .secondInformations {
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    .articleMoreInformations {
      display: flex;
      flex-direction: column;
      padding: 0.5rem 1rem;
      width: 80%;
      .adresse {
        color: #d9501e;
        font-weight: bold;
        margin: 1rem 0 0;

        .localisation {
          display: inline-block;
          background-color: #d9501e;
          border-radius: 3px;
          color: white;
          width: fit-content;
          padding: 0 0.6rem;
          margin-left: 0.4rem;
          line-height: 2.5rem;
          transition-duration: 0.5s;
          transition-property: transform, padding, margin-left;
          :hover {
            transform: rotate(8deg);
            margin-left: 0.4rem;
            background-color: white;
            color: #d9501e;
            width: calc(fit-content - 4px);
            line-height: calc(2.5rem - 4px);
            border: 2px solid #d9501e;
          }
        }
      }
    }
    .actionButtons {
      display: grid;
      grid-template-rows: 1fr 1fr;
      grid-gap: 1px;
      /* Enfants du actionButtons */
      & > button {
        background-color: #454b73;
        color: white;
        font-size: 1.6rem;
        border: 0;
        cursor: pointer;
        border-radius: 5px;
        font-weight: bold;
        text-align: center;
        height: 4rem;
        width: 4.3rem;
        border: none;
        padding: 0.2rem 0 0 0.4rem;
        :hover {
          background-color: #21253f;
          color: white;
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
        font-size: 1.6rem;
        border: 0;
        cursor: pointer;
        border-radius: 5px;
        font-weight: bold;
        text-align: center;
        height: 4rem;
        width: 4.3rem;
        border: none;
        padding: 0.6rem 0 0 0;
        :hover {
          background-color: #21253f;
          color: white;
        }
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

  .price {
    position: absolute;
    top: 1rem;
    right: 2rem;
    color: #673ab7;
    font-weight: bold;
    font-size: 1.6rem;
    font-style: italic;
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
export {
  StylePageView,
  StyledMap,
  StyledArticlesContainer,
  StyledArticlesList,
  StyledPageSlogan,
  StyledTimeIcon,
  StyledClearFilterBtn,
  StyledCritereChoice
};
