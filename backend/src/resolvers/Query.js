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
  /* ---------------------------------
  ---- RECUPERER USER AUTHENTIFIE ----
  ------------------------------------*/
  me(parent, args, ctx, info) {
    // Test si on est un utilisateur authentifié
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
  /* ---------------------------------
  ---- RECUPERER TOUS LES USERS ------
  ------------------------------------*/
  async users(parent, args, ctx, info) {
    // 1. Test si on est connecté
    if (!ctx.request.userId) throw new Error("Vous devez être connecté");
    // 2. Test si l'utilisateur a la permission de voir les autres Users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    // 3. Récupérer les utilisateurs
    return ctx.db.query.users({}, info);
  },
  /* ----------------------------------
  -------- RECUPERE UNE COMMANDE ------
  -------------------------------------*/
  async order(parent, args, ctx, info) {
    // 1. Test si on est connecté
    if (!ctx.request.userId) throw new Error("Vous n'êtes pas connecté!");
    // 2. Récupère l'utilisateur courant
    const order = await ctx.db.query.order(
      {
        where: {
          id: args.id
        }
      },
      info
    );
    // 3. Test si on a les permissions de voir cette commande
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      "ADMIN"
    );
    if (!ownsOrder || !hasPermissionToSeeOrder)
      throw new Error("Vous n'avez pas le droit de voir cette commande");
    // 4. Retourne la commande
    return order;
  },
  /* ----------------------------------
  -------- RECUPERE MES COMMANDEs -----
  -------------------------------------*/
  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) throw new Error("Vous devez être connecté!");
    return ctx.db.query.orders({
      where: {
        user: { id: userId }
      }
    });
  }
};

module.exports = Query;
