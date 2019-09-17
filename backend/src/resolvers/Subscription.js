const SOMETHING_CHANGED = "something changed";

const Subscription = {
  messageSent: {
    subscribe(parent, args, ctx, info) {
      console.log("GET", ctx.pubsub);
      return ctx.pubsub.asyncIterator("post");
    }
  }
};

module.exports = Subscription;

// https://blog.apollographql.com/tutorial-graphql-subscriptions-server-side-e51c32dc2951
