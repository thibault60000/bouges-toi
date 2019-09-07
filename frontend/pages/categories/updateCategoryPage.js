import React from "react";
import UpdateCategory from "../../components/Categories/UpdateCategory";

const UpdateCategoryPage = ({ query }) => (
  <div>
    <UpdateCategory id={query.id} />
  </div>
);

export default UpdateCategoryPage;
