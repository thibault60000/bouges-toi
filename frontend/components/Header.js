import Navbar from "./Navbar";
import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  console.error("Erreur lors du changement de page");
  NProgress.done();
};

const StyledTitle = styled.h1`
  font-size: 4rem;
  margin-left: 1.5rem;
  position: relative;
  transform: skew(-6deg);
  z-index: 2;
  a {
    padding: 0.3rem 0.6rem;
    background: ${props => props.theme.primary};
    text-transform: uppercase;
    color: ${props => props.theme.textWhite} !important;
    text-decoration: none;
  }
  @media (max-width: 1200px) {
    text-align: center;
    margin: 0;
  }
`;

const StyledHeader = styled.header`
  .navbar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    border-bottom: 5px dashed ${props => props.theme.primary};
    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-navbar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid lightgrey;
  }
`;

const Header = () => (
  <StyledHeader>
    {/* NavBar */}
    <div className="navbar">
      <StyledTitle>
        <Link href="/">
          <a> Bouges toi ! </a>
        </Link>
      </StyledTitle>
      <Navbar />
    </div>
    {/* Sous Menu */}
    <div className="sub-navbar">
      <p> Rechercher </p>
    </div>
    {/* Panier */}
    <div>Mon panier</div>
  </StyledHeader>
);

export default Header;
