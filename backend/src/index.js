const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require("dotenv").config({
  path: "variables.env"
});

const createServer = require("./createServer");

const server = createServer();

// Express Middleware pour Cookies (JWT)
server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (!!token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
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
