const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const Subscription = require("./resolvers/Subscription");
const db = require("./db");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

// Création du serveur GraphQL Yoga
function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query,
      Subscription
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db, pubsub })
  });
}

module.exports = createServer;
