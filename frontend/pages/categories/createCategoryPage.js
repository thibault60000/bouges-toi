import React from "react";
import CreateCategory from "../../components/Categories/CreateCategory";
import PleaseSignIn from "../../components/Authentication/PleaseSignIn";

const CreateCategoryPage = props => (
  <div>
    <PleaseSignIn>
      <CreateCategory />
    </PleaseSignIn>
  </div>
);

export default CreateCategoryPage;
