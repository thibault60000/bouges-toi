// React - Nextjs
import Link from "next/link";
import Router from "next/router";

// Styled
import { StyledTitle, StyledHeader } from "./styles/StyledHeader";

// Progress
import NProgress from "nprogress";

// Components
import Cart from "./Cart/Cart";
import Search from "./Search";
import Navbar from "./Navbar";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

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
