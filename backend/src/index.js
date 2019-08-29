const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config({
  path: "variables.env"
});

const createServer = require("./createServer");
const server = createServer();
const db = require("./db");

// Express Middleware pour Cookies (JWT)
server.express.use(cookieParser());

// Express Middleware pour ajouter le "UserID" aux requêtes
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (!!token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

// Express Middleware pour définir l'objet "User"
server.express.use(async (req, res, next) => {
  // 1. Si non connecté, on passe à la suite
  if (!req.userId) return next();
  const user = await db.query.user(
    {
      where: { id: req.userId }
    },
    `{id, permissions, email, name, surname}`
  );
  req.user = user;
  next();
});

// Start Serveur
server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  response => {
    console.log(`Serveur démarré http://localhost:${response.port}`);
  }
);
