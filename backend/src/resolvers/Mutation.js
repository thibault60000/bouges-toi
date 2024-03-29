const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, email } = require("../mail");
const { hasPermission } = require("../utils");
const stripe = require("../stripe");

const Mutations = {
  /* ------------------------------------------
    ------- CREATE ARTICLE ----------------------
    ---------------------------------------------*/
  async createArticle(
    parent,
    {
      title,
      description,
      image,
      nbPersons,
      greatImage,
      adresse,
      begin_date,
      end_date,
      price,
      rubrique,
      category
    },
    ctx,
    info
  ) {
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
          users: {
            connect: {
              id: ctx.request.userId
            }
          },
          rubrique: {
            connect: {
              id: rubrique
            }
          },
          category: {
            connect: {
              id: category
            }
          },
          title,
          description,
          image,
          nbPersons,
          greatImage,
          adresse,
          begin_date,
          end_date,
          price
        }
      },
      info
    );

    return article;
  },
  /* ---------------------------------------
  ------- JOIN ARTICLE ---------------------
  ------------------------------------------*/
  async joinArticle(parent, args, ctx, info) {
    // 1. Test si le user est connecté
    if (!ctx.request.userId) {
      throw new Error("Vous devez être connecté");
    }
    // 2. Test si on a les droits de JOINDRE
    const hasPermission = ctx.request.user.permissions.some(p =>
      ["USER", "ADMIN"].includes(p)
    );
    if (!hasPermission)
      throw new Error("Vous n'êtes pas autorisé à faire ça ! ");
    // 3. Récupère l'article
    const article = await ctx.db.query.article(
      { where: { id: args.id } },
      ` { id nbPersons user { id } users { id }}`
    );
    // 4. Test si on a pas dépassé le nombre max de personnes
    const { nbPersons, users, id, user } = article;
    if (users.length >= nbPersons)
      throw new Error("Il ne reste aucune place sur cet évènement");
    // 5. Ajoute l'utilisateur courant à l'article
    const newUsers = users.map(u => {
      const userId = { id: u.id };
      return userId;
    });
    newUsers.push({ id: ctx.request.userId });
    // 6. Supprimer les valeurs inutiles
    const idCreator = user.id;
    delete article.id;
    delete user;
    // 7. Update Article
    const articleUpdated = ctx.db.mutation.updateArticle(
      {
        data: {
          ...article,
          user: {
            connect: {
              id: idCreator
            }
          },
          users: {
            set: newUsers
          }
        },
        where: {
          id
        }
      },
      info
    );
    // 8 . Retourne article
    return articleUpdated;
  },
  /* ---------------------------------------
  ------- QUIT ARTICLE ---------------------
  ------------------------------------------*/
  async quitArticle(parent, args, ctx, info) {
    // 1. Test si le user est connecté
    if (!ctx.request.userId) {
      throw new Error("Vous devez être connecté");
    }
    // 2. Test si on a les droits de quitter
    const hasPermission = ctx.request.user.permissions.some(p =>
      ["USER", "ADMIN"].includes(p)
    );
    if (!hasPermission)
      throw new Error("Vous n'êtes pas autorisé à faire ça ! ");
    // 3. Récupère l'article
    const article = await ctx.db.query.article(
      { where: { id: args.id } },
      ` { id user { id } users { id }}`
    );
    // 4. Test si on fait parti de la liste des personnes mais qu'on est pas le créateur
    const { users, user, id } = article;
    if (ctx.request.user === user.id)
      throw new Error("Vous ne pouvez pas quitter votre propre évènement");
    const hasJoinedThisArticle = users.some(u => ctx.request.userId === u.id);
    if (!hasJoinedThisArticle)
      throw new Error("Vous ne faites pas parti de cet évènement");
    // 5. Supprime l'utilisateur courant de l'article
    const newUsers = [];
    users.forEach(u => {
      if (ctx.request.userId !== u.id) newUsers.push({ id: u.id });
    });
    // 6. Supprimer les valeurs inutiles
    const idCreator = user.id;
    delete article.id;
    delete user;
    // 7. Update Article
    const articleUpdated = await ctx.db.mutation.updateArticle(
      {
        data: {
          ...article,
          user: {
            connect: {
              id: idCreator
            }
          },
          users: {
            set: newUsers
          }
        },
        where: {
          id
        }
      },
      `{id users { id } user { id }}`
    );
    // 8 . Retourne article
    return articleUpdated;
  },
  /* --------------------------------
  ---------- CREATE MESSAGE ---------
  -----------------------------------*/
  async createMessage(parent, args, ctx, info) {
    // 1. Test si le user est connecté
    if (!ctx.request.userId) {
      throw new Error("Vous devez être connecté");
    }
    // 2. Test si on a les droits de quitter
    const hasPermission = ctx.request.user.permissions.some(p =>
      ["USER", "ADMIN"].includes(p)
    );
    if (!hasPermission)
    throw new Error("Vous n'êtes pas autorisé à faire ça ! ");
    // 3. Récupère l'ID de l'article et supprime des données
    const { articleId } = args;
    delete args.articleId;
    const message = await ctx.db.mutation.createMessage(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          article: {
            connect: {
              id: articleId
            }
          },
          ...args
        }
      },
      info
    );
    return message;
  },
  
  updateTitle(parent, { id, newTitle }, ctx, info) {
    return ctx.db.mutation.updateMessage(
      {
        where: {
          id,
        },
        data: {
          title: newTitle,
        },
      },
      info,
    )
  },
  deleteMessage(parent, { id }, ctx, info) {
    return ctx.db.mutation.deleteMessage({
      where: {
        id
      }
    })
  },
  /* ------------------------------------------
    ------- CREATE CATEGORY ----------------------
    ---------------------------------------------*/
  async createCategoryRubrique(parent, { title, rubrique }, ctx, info) {
    // 1. Test si le user est connecté
    if (!ctx.request.userId) {
      throw new Error("Vous devez être connecté");
    }
    // 2. Test si on a les droits de création
    const hasPermission = ctx.request.user.permissions.some(p =>
      ["ADMIN", "CATEGORYCREATE"].includes(p)
    );
    if (!hasPermission)
      throw new Error("Vous n'êtes pas autorisé à faire ça ! ");
    // 3. Créer l'category
    const category = await ctx.db.mutation.createCategory(
      {
        data: {
          rubrique: {
            connect: {
              id: rubrique
            }
          },
          title
        }
      },
      info
    );

    return category;
  },
  /* ------------------------------------------
    ------- CREATE PREMIUM OFFER --------------
    ---------------------------------------------*/
  async createPremiumOffer(parent, args, ctx, info) {
    // 1. Test si le user est connecté
    if (!ctx.request.userId) {
      throw new Error("Vous devez être connecté");
    }
    // 2. Test si on a les droits de création
    const hasPermission = ctx.request.user.permissions.some(p =>
      ["ADMIN"].includes(p)
    );
    if (!hasPermission)
      throw new Error("Vous n'êtes pas autorisé à faire ça ! ");
    // 3. Créer l'article
    const offer = await ctx.db.mutation.createPremiumOffer(
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

    return offer;
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
  async signup(parent, { password, email, name, surname, picture }, ctx, info) {
    email = email.toLowerCase();
    const passwordCrypted = await bcrypt.hash(password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          email,
          name,
          surname,
          picture,
          password: passwordCrypted,
          permissions: {
            set: ["USER", "ARTICLECREATE", "ARTICLEUPDATE", "ARTICLEDELETE"]
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
  -------- FACEBOOK Signup ---------------------
  ---------------------------------------------*/
  async facebookSignup(parent, args, ctx, info) {
    const emailLowered = args.email.toLowerCase();
    const passwordEncrypted = await bcrypt.hash(args.userID, 10);
    const nameBegin = args.name ? args.name.split(" ")[0] : "";
    const surnameEnd = args.name ? args.name.split(" ")[1] : "";
    const picture = args.picture ? args.picture : "";
    const user = await ctx.db.mutation
      .createUser(
        {
          data: {
            name: nameBegin,
            surname: surnameEnd,
            email: emailLowered,
            password: passwordEncrypted,
            picture,
            permissions: {
              set: ["USER"]
            }
          }
        },
        info
      )
      .catch(err => {
        throw new Error(
          "Ce compte existe deja ou n'est pas valide. Un compte par adresse mail"
        );
      });
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    return user;
  },
  /* ------------------------------------------
  -------- FACEBOOK Signin ---------------------
  ---------------------------------------------*/
  async facebookSignin(parent, args, ctx, info) {
    const emailLowered = args.email.toLowerCase();
    const passwordEncrypted = await bcrypt.hash(args.userID, 10);
    const nameBegin = args.name ? args.name.split(" ")[0] : "";
    const surnameEnd = args.name ? args.name.split(" ")[1] : "";

    const user = await ctx.db.query.user({ where: { email: emailLowered } });
    if (!user) {
      throw new Error("Aucun utilisateur pour cet email");
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
  },
  /* ------------------------------------
  ------ ADD TO CART  --------------------
  ---------------------------------------*/
  async addToCart(parent, args, ctx, info) {
    // 1. Vérifier si on est connecté
    const { userId } = ctx.request;
    if (!userId) throw new Error("Vous devez être connecté !");
    // 2. Récupérer les éléments du panier actuel de l'utilisateur
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId },
        premiumOffer: { id: args.id }
      }
    });
    // 3. Test si l'élément est deja dans le panier, si c'est le cas on incrémente
    if (existingCartItem) {
      const premiumOffer = await ctx.db.query.premiumOffer({
        where: {
          id: args.id
        }
      });
      if (premiumOffer.multiple === true) {
        return ctx.db.mutation.updateCartItem(
          {
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + 1 }
          },
          info
        );
      }
      throw new Error(
        "Vous avez deja ajouter cet article a votre panier et il n'est possible d'en ajouter qu'un seul"
      );
    }
    // 4. S'il n'est pas dans le panier, on l'ajoute pour ce user
    return ctx.db.mutation.createCartItem(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          premiumOffer: {
            connect: { id: args.id }
          }
        }
      },
      info
    );
  },
  /* ------------------------------------
  ------ REMOVE FROM CART ---------------
  ---------------------------------------*/
  async removeFromCart(parent, args, ctx, info) {
    // 1. Récupérer le CartItem
    const cartItem = await ctx.db.query.cartItem(
      {
        where: {
          id: args.id
        }
      },
      `{ id, user { id }}`
    );
    // 2. Test si on récupère bien un élément dans le panier
    if (!cartItem) throw new Error("Pas d'élément du panier trouvé !");
    // 2. Test si c'est bien notre cart item
    if (cartItem.user.id !== ctx.request.userId) {
      throw new Error("Ce n'est pas votre panier !");
    }
    // 3. Supprimer le cartItem
    return ctx.db.mutation.deleteCartItem(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  /* ------------------------------------
  ------  CREATE ORDER ------------------
  ---------------------------------------*/
  async createOrder(parent, args, ctx, info) {
    // 1. Récupère le user courant et vérifier qu'il est connecté
    const { userId } = ctx.request;
    if (!userId)
      throw new Error("Vous devez être connecté pour finir la commande");
    // TODO : Ajouter image dans la query du premium offer
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `{ 
        id 
        name 
        surname 
        email 
        cart { 
          id 
          quantity 
          premiumOffer { 
            title 
            price 
            id 
            description 
          }
        }
      }`
    );
    // 2. Recalculer le prix total
    const amount = user.cart.reduce(
      (tally, cartItem) =>
        tally + cartItem.premiumOffer.price * cartItem.quantity,
      0
    );
    // 3. Créer la Stripe Charge
    const charge = await stripe.charges.create({
      amount,
      currency: "EUR",
      source: args.token
    });
    // 4. Convertir les cartItems en orderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.premiumOffer,
        quantity: cartItem.quantity,
        user: {
          connect: {
            id: userId
          }
        }
      };
      delete orderItem.id;
      return orderItem;
    });
    // 5. Créer la commande
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } }
      }
    });
    // 6. Vider le panier de l'utilisateur, supprimer les cartItems
    const cartItemsIds = user.cart.map(cartItem => cartItem.id);
    await ctx.db.mutation.deleteManyCartItems({
      where: {
        id_in: cartItemsIds
      }
    });
    // 7. Retourne la commande au client
    return order;
  }
};

module.exports = Mutations;
