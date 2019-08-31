import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../Error";
import StyledTable from "../styles/StyledTable";
import styled from "styled-components";
import PropTypes from "prop-types";

// Query
const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      surname
      email
      permissions
    }
  }
`;

// Permissions
const permissionsList = [
  "USER",
  "ARTICLECREATE",
  "ARTICLEUPDATE",
  "ARTICLEDELETE",
  "PERMISSIONUPDATE",
  "PREMIUM"
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION(
    $permissions: [Permission]
    $userId: ID!
  ) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      surname
      email
    }
  }
`;

const StyledPermissions = styled.div`
  overflow: hidden;
  overflow-x: auto;
  max-width: 100%;
  text-align: center;
`;
// Component
const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p> Chargement ... </p>;
      if (!data) return <Error error={error} />;
      if (data.users) {
        return (
          <StyledPermissions>
            <Error error={error} />
            <h2> Gestion des droits</h2>
            <div>
              {/* Table */}
              <StyledTable>
                <thead>
                  <tr>
                    <th> Nom </th>
                    <th> Email </th>
                    <th> Actions </th>
                    {permissionsList.map(p => (
                      <th key={p}> {p} </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.users.map(user => (
                    <UserLine key={user.id} user={user} />
                  ))}
                </tbody>
              </StyledTable>
            </div>
          </StyledPermissions>
        );
      }
    }}
  </Query>
);

class UserLine extends React.Component {
  // PropTypes
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array
    }).isRequired
  };

  //State
  state = {
    permissions: this.props.user.permissions
  };

  /* -----------------------------
  ---- Check une permission ------
  --------------------------------*/
  onCheckPermission = (e, updatePermissions) => {
    const checkbox = e.target;
    // 1. Copier la permission
    let updatedPermissions = [...this.state.permissions];
    // 2. Toggle la permission
    if (checkbox.checked) updatedPermissions.push(checkbox.value);
    else
      updatedPermissions = updatedPermissions.filter(p => p !== checkbox.value);
    // 3. Modifier le state avec les nouvelles permissions
    this.setState({ permissions: updatedPermissions }, updatePermissions);
  };

  // Render
  render() {
    const user = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: this.props.user.id
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && <tr><td colspan="10"><Error error={error} /></td></tr>}
            <tr>
              <td>
                {user.name} {user.surname}
              </td>
              <td> {user.email} </td>
              <td>
                -
              </td>
              {permissionsList.map(p => (
                <td key={`checkbox-${p}`}>
                  <label htmlFor={`${user.id}-permission-${p}`}>
                    <input
                      type="checkbox"
                      value={p}
                      id={`${user.id}-permission-${p}`}
                      onChange={(e) => this.onCheckPermission(e, updatePermissions)}
                      checked={this.state.permissions.includes(p)}
                    />
                  </label>
                </td>
              ))}
            </tr>
          </>
        )}
      </Mutation>
    );
  }
}
export default Permissions;
