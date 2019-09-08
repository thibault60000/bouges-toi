import Navbar from "./Navbar";
import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import Cart from "./Cart/Cart";
import Search from "./Search";

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
    background: ${props => props.theme.violet};
    text-transform: uppercase;
    color: ${props => props.theme.whiteText} !important;
    text-decoration: none;
  }
  @media (max-width: 1200px) {
    font-size: 2rem;
  
  }
`;

const StyledHeader = styled.header`
  .navbar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-navbar {
    display: grid;
    grid-template-columns: 1fr auto;
  }
`;

const Header = () => (
  <StyledHeader>
    {/* NavBar */}
    <div className="navbar">
      <StyledTitle>
        <Link href="/">
          <a> Bouge toi ! </a>
        </Link>
      </StyledTitle>
      <Navbar />
    </div>
    {/* Panier */}
    <Cart />
  </StyledHeader>
);

export default Header;
