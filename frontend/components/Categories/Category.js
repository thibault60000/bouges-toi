import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import StyledCategory from "../styles/StyledCategory";
import StyledTitle from "../styles/StyledTitle";

const propTypes = {
  category: PropTypes.object.isRequired
};

export class Category extends Component {
  render() {
    const { category } = this.props;
    return (
      <StyledCategory>
        {category.image ? (
          <img src={category.image} alt={category.title} />
        ) : null}
        <StyledTitle>
          {/* Titre  */}
          <Link
            href={{
              pathname: "/categories/category",
              query: { id: category.id }
            }}
          >
            <a> {category.title} </a>
          </Link>
        </StyledTitle>
        {/*  Boutons d'action */}
        <div className="actionButtons">
          <Link
            href={{
              pathname: "/categories/updateCategoryPage",
              query: { id: category.id }
            }}
          >
            <a> Modifier </a>
          </Link>
        </div>
      </StyledCategory>
    );
  }
}

Category.propTypes = propTypes;

export default Category;
