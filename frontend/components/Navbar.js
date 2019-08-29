import Link from "next/link";
import StyledNavbar from "./styles/StyledNavbar";
import User from "./Authentication/User";
import Signout from "./Authentication/Signout";

const Navbar = () => (
  <User>
    {({ data: { me } }) => (
      <StyledNavbar>
        <Link href="/">
          <a> Accueil </a>
        </Link>
        {me && (
          <>
            <Link href="articles/createArticlePage">
              <a> Création </a>
            </Link>
            <Link href="articles//articles">
              <a> Articles </a>
            </Link>
            <Link href="/commandes">
              <a> Commandes </a>
            </Link>
            <Link href="/moncompte">
              <a> Mon Compte </a>
            </Link>
            <Signout />
          </>
        )}
        {!me && (
          <Link href="/login">
            <a> Inscription </a>
          </Link>
        )}
      </StyledNavbar>
    )}
  </User>
);

export default Navbar;
