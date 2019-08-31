const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");
const Query = {
  articles: forwardTo("db"),
  article: forwardTo("db"),
  articlesConnection: forwardTo("db"),
  rubrique: forwardTo("db"),
  rubriques: forwardTo("db"),
  premiumOffer: forwardTo("db"),
  premiumOffers: forwardTo("db"),
  me(parent, args, ctx, info) {
    console.log("request", ctx.request);
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // 1. Test si on est connecté
    if (!ctx.request.userId) throw new Error("Vous devez être connecté");
    // 2. Test si l'utilisateur a la permission de voir les autres Users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    // 3. Récupérer les utilisateurs
    return ctx.db.query.users({}, info);
  }
};

module.exports = Query;
