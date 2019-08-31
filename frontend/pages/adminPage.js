import PleaseSignIn from "../components/Authentication/PleaseSignIn";
import Admin from "../components/Authentication/Admin";

const AdminPage = props => (
  <div>
    <PleaseSignIn>
      <Admin />
    </PleaseSignIn>
  </div>
);

export default AdminPage;
