const cookieParser = require("cookie-parser");
const session = require('express-session')

require("dotenv").config({
  path: "variables.env"
});

const createServer = require("./createServer");
const server = createServer();
const db = require("./db");

// Express Middleware pour Cookies (JWT)
server.express.use(cookieParser());

server.express.use(session({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1200000, // 20 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
}));

// Express Middleware pour définir l'objet "User"
server.express.use(async (req, res, next) => {
  // 1. Si non connecté, on passe à la suite
  if (!req.session.userId) return next();
  const user = await db.query.user(
    {
      where: { id: req.session.userId }
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
