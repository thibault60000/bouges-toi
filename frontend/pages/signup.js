import Signup from "../components/Authentication/Signup";
import Link from "next/link";

const SignupPage = props => (
  <div>
    <Signup />
    <p>
      Déjà un compte ?
      <Link href="/login">
        <a> Se connecter </a>
      </Link>
    </p>
  </div>
);

export default SignupPage;
