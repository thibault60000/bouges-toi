const { forwardTo } = require("prisma-binding");

const Query = {
  articles: forwardTo("db"),
  article: forwardTo("db"),
  articlesConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    const user = ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
    return user;
  },
};

module.exports = Query;
