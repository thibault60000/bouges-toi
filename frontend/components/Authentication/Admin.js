import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../Error";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";

// Component
const Admin = props => (
  <div>
      <h2> Gestion de l'application </h2>
      <ul>
          <li>
              <Link href="/rubriques/rubriques">
                  <a> Gestion des rubriques </a>
              </Link>
          </li>
          <li>
              <Link href="/categories/categories">
                  <a> Gestion des catégories </a>
              </Link>
          </li>
          <li>
              <Link href="/controlPermissions">
                  <a> Gestion des droits </a>
              </Link>
          </li>
          <li>
              <h3> Offres premiums </h3>
              <Link href="/premiumOffers/createPremiumOfferPage">
                  <a> Créer une offre premium </a>
              </Link>
              <Link href="/premiumOffers/premiumOffersPage">
                  <a> Voir les offres premium </a>
              </Link>
          </li>
      </ul>
  </div>
);

  
export default Admin;
