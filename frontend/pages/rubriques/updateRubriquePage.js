import React from "react";
import UpdateRubrique from "../../components/Rubriques/UpdateRubrique";

const UpdateRubriquePage = ({ query }) => (
    <div>
        <UpdateRubrique id={query.id} />
    </div>
)

export default UpdateRubriquePage;
 