import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";
import { LOCAL_STATE_QUERY_CART_OPEN } from "../components/Cart/Cart";
import { LOCAL_STATE_QUERY_MENU_OPEN } from "../components/Navbar";

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    // Local Data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // 1. Get la valeur du cartOpen dans le cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY_CART_OPEN
            });
            // 2 Ecrire dans le cache l'oposé de cartOpen
            const data = {
              data: {
                cartOpen: !cartOpen
              }
            };
            cache.writeData(data);
            return data;
          },
          toggleMenu(_, variables, { cache }) {
            const { menuOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY_MENU_OPEN
            });
            const data = {
              data: {
                menuOpen: !menuOpen
              }
            };
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        cartOpen: false,
        menuOpen: false
      }
    }
  });
}

export default withApollo(createClient);
