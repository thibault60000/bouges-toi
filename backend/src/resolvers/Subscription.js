const Subscription = {
  publications: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.db.subscription.message(
        {
          where: {
            mutation_in: ['CREATED', 'UPDATED'],
          },
        },
        info,
      )
    },
  },
  messageDeleted: {
    subscribe: (parent, args, ctx, info) => {
      const selectionSet = `{ previousValues { id title } }`
      return ctx.db.subscription.message(
        {
          where: {
            mutation_in: ['DELETED'],
          },
        },
        selectionSet,
      )
    },
    resolve: (payload, args, context, info) => {
      return payload ? payload.message.previousValues : payload
    },
  }
};

module.exports = Subscription;

// https://blog.apollographql.com/tutorial-graphql-subscriptions-server-side-e51c32dc2951
