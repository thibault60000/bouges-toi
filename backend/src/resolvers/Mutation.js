const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");

const Mutations = {
  /* ------------------------------------------
    ------- CREATE ARTICLE ----------------------
    ---------------------------------------------*/
  async createArticle(parent, args, ctx, info) {
    const article = await ctx.db.mutation.createArticle(
      {
        data: {
          ...args
        }
      },
      info
    );

    return article;
  },
  /* ------------------------------------------
    ------- UPDATE ARTICLE ----------------------
    ---------------------------------------------*/
  updateArticle(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
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
    const article = await ctx.db.query.article(
      { where: { id: args.id } },
      ` { id title }`
    );
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
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
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
    return { message: "Mot de passe envoyé" };
    // 3. Envoyer le nouveau token par mail
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
  }
};

module.exports = Mutations;
