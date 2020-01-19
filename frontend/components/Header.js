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
  display: inline-block;
  margin: 0.5rem;
  z-index: 10;
  a {
    padding: 0.4rem 0.6rem;
    border-radius: 3px;
    background: ${props => props.theme.bt_red};
    text-transform: uppercase;
    color: ${props => props.theme.whiteText} !important;
    text-decoration: none;
  }

`;

const StyledHeader = styled.header`
  .navbar {
    margin: 0 auto;
    padding: 0.5rem;
    position: relative;
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
    {/* <Cart /> */}
  </StyledHeader>
);

export default Header;
