const SOMETHING_CHANGED = "something changed";

const Subscription = {
  messageSent: {
    resolve: (payload, args, ctx, info) => {
      console.log("wah",  payload, args, ctx, info);
      return payload;
    },
    subscribe: (parent, args, ctx, info) => {
      console.log("TEST", ctx.pubsub);
      return ctx.pubsub.asyncIterator(SOMETHING_CHANGED);
    }
  }
};

module.exports = Subscription;

// https://blog.apollographql.com/tutorial-graphql-subscriptions-server-side-e51c32dc2951
