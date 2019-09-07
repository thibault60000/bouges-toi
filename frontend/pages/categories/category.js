import React from "react";
import ReadCategory from "../../components/Categories/ReadCategory";

const CategoryPage = props => {
  return (
    <div>
      <ReadCategory id={props.query.id} />
    </div>
  );
};

export default CategoryPage;
