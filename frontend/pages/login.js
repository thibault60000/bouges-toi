import Signin from "../components/Authentication/Signin";
import Link from "next/link";

const LoginPage = props => (
  <div>
    <p>
      {" "}
      Pas encore de compte ?
      <Link href="/signup">
        <a>S'inscrire</a>
      </Link>
    </p>
    <Signin />
    <Link href="/requestResetPage">
      <a> Mot de passe oublié ?</a>
    </Link>
  </div>
);

export default LoginPage;
