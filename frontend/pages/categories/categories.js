import React from 'react';
import Categories from "../../components/Categories/Categories";
import Link from "next/link";

const CategoriesPage = props => {
    return (
        <div>
            <Link href="/categories/createCategoryPage">
                <a> Créer une catégorie </a>
            </Link>
            <Categories />
        </div>
    );
}

export default CategoriesPage;
