import PleaseSignIn from "../components/Authentication/PleaseSignIn";
import Permissions from "../components/Authentication/Permissions";

const ControlPersmissions = props => (
  <div>
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  </div>
);

export default ControlPersmissions;
