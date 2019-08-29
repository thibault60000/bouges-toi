import Signup from "../components/Authentication/Signup";
import Signin from "../components/Authentication/Signin";
import Link from "next/link";

const SignupPage = props => (
  <div>
    <Signin />
    <Signup />
    <Link href="/requestResetPage">
      <a> Mot de passe oublié ?</a>
    </Link>
  </div>
);

export default SignupPage;
