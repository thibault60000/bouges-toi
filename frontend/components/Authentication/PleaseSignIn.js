import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY} fetchPolicy="no-cache">
    {({ data, loading }) => {
      if (loading) return <p>Chargement...</p>;
      if (!data.me) {
        return (
          <div>
            <p> Veuillez vous connecter pour créer un article </p>
            <Signin />
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

export default PleaseSignIn;
