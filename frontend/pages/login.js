import Signin from "../components/Authentication/Signin";
import Link from "next/link";

const LoginPage = props => (
  <div>
    <Signin />
    <p>
      Pas encore de compte ?
      <Link href="/signup">
        <a>
          <strong style={{ "textDecoration": "underline" }}> S'inscrire</strong>
        </a>
      </Link>
    </p>
    <p>
      Mot de passe oublié ? 
      <Link href="/requestResetPage">
        <a>
          <strong style={{ "textDecoration": "underline" }}> Récupérer mon mot de passe !</strong>
        </a>
      </Link>
    </p>
  </div>
);

export default LoginPage;
