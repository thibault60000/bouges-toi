const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, email } = require("../mail");
const { hasPermission } = require("../utils");

const Mutations = {
  /* ------------------------------------------
    ------- CREATE ARTICLE ----------------------
    ---------------------------------------------*/
  async createArticle(parent, args, ctx, info) {
    // 1. Test si le user est connecté
    if (!ctx.request.userId) {
      throw new Error("Vous devez être connecté");
    }
    // 2. Test si on a les droits de création
    const hasPermission = ctx.request.user.permissions.some(p =>
      ["ADMIN", "ARTICLECREATE"].includes(p)
    );
    if (!hasPermission)
      throw new Error("Vous n'êtes pas autorisé à faire ça ! ");
    // 3. Créer l'article
    const article = await ctx.db.mutation.createArticle(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );

    return article;
  },
  /* ------------------------------------------
    ------- CREATE RUBRIQUE ----------------------
    ---------------------------------------------*/
  async createRubrique(parent, args, ctx, info) {
    // 1. Test si le user est connecté
    if (!ctx.request.userId) {
      throw new Error("Vous devez être connecté");
    }
    // 2. Test si on a les droits de création
    const hasPermission = ctx.request.user.permissions.some(p =>
      ["ADMIN", "RUBRIQUECREATE"].includes(p)
    );
    if (!hasPermission)
      throw new Error("Vous n'êtes pas autorisé à faire ça ! ");
    // 3. Créer la rubrique
    const rubrique = await ctx.db.mutation.createRubrique(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );

    return rubrique;
  },
  /* ------------------------------------------
    ------- UPDATE ARTICLE ----------------------
    ---------------------------------------------*/
  updateArticle(parent, args, ctx, info) {
    // 1. Test si on a la permission et que c'est notre article
    const hasPermission = ctx.request.user.permissions.some(p =>
      ["ADMIN", "ARTICLECREATE"].includes(p)
    );
    const ownsArticle = args.user === ctx.request.userId;
    if (!hasPermission && !ownsArticle)
      throw new Error("Vous n'êtes pas autorisé !");
    // 2. Construction de l'objet final à envoyer
    const updates = {
      ...args,
      user: {
        connect: {
          id: ctx.request.userId
        }
      }
    };
    // 3. Suppression de l'ID
    delete updates.id;
    // 4. Execution de la mise à jour
    return ctx.db.mutation.updateArticle(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  /* ------------------------------------------
    ------- DELETE ARTICLE ----------------------
    ---------------------------------------------*/
  async deleteArticle(parent, args, ctx, info) {
    // 1. Récupère l'article
    const article = await ctx.db.query.article(
      { where: { id: args.id } },
      ` { id title user { id } }`
    );
    // 2. Test si on est le créateur de l'article
    const ownsArticle = article.user.id === ctx.request.userId;
    const hasPermission = ctx.request.user.permissions.some(p =>
      ["ADMIN", "ARTICLEDELETE"].includes(p)
    );
    if (!ownsArticle && !hasPermission) {
      throw new Error("Vous n'êtes pas autorisé à faire ça ! ");
    }
    return ctx.db.mutation.deleteArticle({ where: { id: args.id } }, info);
  },
  /* ------------------------------------------
    ------- USER SIGN UP ------------------------
    ---------------------------------------------*/
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: {
            set: ["USER"]
          }
        }
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    return user;
  },
  /* ------------------------------------------
    ------- USER SIGN IN ------------------------
    ---------------------------------------------*/
  async signin(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error("Aucun utilisateur pour cet email");
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Mot de passe incorrect");
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    return user;
  },
  /* ------------------------------------------
    ------- SIGN OUT --------------------------
    ---------------------------------------------*/
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Au revoir !" };
  },
  /* ------------------------------------------
    ------- SEND TOKEN TO EMAIL ---------------
    ---------------------------------------------*/
  async requestReset(parent, args, ctx, info) {
    // 1. Test si le user existe
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) throw new Error("L'utilisateur n'éxiste pas");
    // 2. Définir un nouveau token
    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await randomBytesPromiseified(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 heure
    const response = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });
    // 3. Envoyer le nouveau token par mail
    const mailResponse = await transport.sendMail({
      from: "thibault.jeanpierre.dev@gmail.com",
      to: user.email,
      subject: "Récupération de mot de passe",
      html: email(
        `Votre lien de récupération est : \n\n <a href="${process.env.FRONTEND_URL}/resetPasswordPage?resetToken=${resetToken}" > le suivant </a>`
      )
    });
    // 4. Retourne le message
    return { message: "Mot de passe envoyé" };
  },
  /* ------------------------------------------
    ------- RESET PASSWORD ----------------------
    ---------------------------------------------*/
  async resetPassword(parent, args, ctx, info) {
    // 1. Test si les mots de passe correspondent
    if (args.password !== args.confirmPassword)
      throw new Error("Les mots de passe sont différents");
    // 2. Test si le token de reset existe et n'est pas expiré
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });
    if (!user)
      throw new Error("Le jeton n'est pas valide ou celui-ci est expiré");
    // 3. Crypter le nouveau mot de passe
    const password = await bcrypt.hash(args.password, 10);
    // 4. Sauvegarder le nouveau mdp du user et supprimer les champs de 'resetToken'
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    // 5. Générer un nouveau token (JWT)
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // 6. Ajouter le token (JWT) dans les cookies
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 7. Retourner l'utilisateur
    return updatedUser;
  },
  /* ------------------------------------
  ------ UPDATE PERMISSIONS -------------
  ---------------------------------------*/
  async updatePermissions(parent, args, ctx, info) {
    // 1. Test si on est authentifié
    if (!ctx.request.userId) throw new Error("Vous devez être connecté");
    // 2. Récupère l'utilisateur courant
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        }
      },
      `{id, permissions, email, name, surname permissions }`
    );
    // 3. Tester les permissions pour mettre à jour
    hasPermission(currentUser, ["ADMIN", "PERMISSIONUPDATE"]);
    // 4. Mettre à jour les permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions
          }
        },
        where: {
          id: args.userId
        }
      },
      info
    );
  }
};

module.exports = Mutations;
