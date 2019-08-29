const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");
const Query = {
  articles: forwardTo("db"),
  article: forwardTo("db"),
  articlesConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    if (!ctx.response.req.session.userId) {
      return null;
    }
    console.log(ctx.response.req.session.userId);
    const user = ctx.db.query.user(
      {
        where: { id: ctx.response.req.session.userId }
      },
      info
    );
    return user;
  },
  async users(parent, args, ctx, info) {
    // 1. Test si on est connecté
    if (!ctx.response.req.session.userId) throw new Error("Vous devez être connecté");
    // 2. Test si l'utilisateur a la permission de voir les autres Users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    // 3. Récupérer les utilisateurs
    return ctx.db.query.users({}, info);
  }
};

module.exports = Query;
