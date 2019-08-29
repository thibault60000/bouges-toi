import { Query } from "react-apollo";
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
  "ADMIN",
  "USER",
  "ARTICLECREATE",
  "ARTICLEUPDATE",
  "ARTICLEDELETE",
  "RUBRIQUECREATE",
  "RUBRIQUEUPDATE",
  "RUBRIQUEDELETE",
  "CATEGORYCREATE",
  "CATEGORYUPDATE",
  "CATEGORYDELETE",
  "PERMISSIONUPDATE",
  "PRENIUM"
];

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
  onCheckPermission = e => {
    const checkbox = e.target;
    // 1. Copier la permission
    let updatedPermissions = [...this.state.permissions];
    // 2. Toggle la permission
    if (checkbox.checked) updatedPermissions.push(checkbox.value);
    else
      updatedPermissions = updatedPermissions.filter(p => p !== checkbox.value);
    // 3. Modifier le state avec les nouvelles permissions
    this.setState({ permissions: updatedPermissions });
  };

  // Render
  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>
          {user.name} {user.surname}
        </td>
        <td> {user.email} </td>
        <td>
          <button> Maj </button>
        </td>
        {permissionsList.map(p => (
          <td key={`checkbox-${p}`}>
            <label htmlFor={`${user.id}-permission-${p}`}>
              <input
                type="checkbox"
                value={p}
                onChange={this.onCheckPermission}
                checked={this.state.permissions.includes(p)}
              />
            </label>
          </td>
        ))}
      </tr>
    );
  }
}
export default Permissions;
