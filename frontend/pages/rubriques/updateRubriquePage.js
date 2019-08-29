import React from "react";
import UpdateRubrique from "../../components/Articles/UpdateRubrique";

const UpdateRubriquePage = ({ query }) => (
    <div>
        <UpdateRubrique id={query.id} />
    </div>
)

export default UpdateRubriquePage;
 