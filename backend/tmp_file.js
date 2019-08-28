server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1200000, // 20 minutes
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  }));

  // express-session

  req.session.destroy()

  req.session.userId = userId;

  // var session = require('express-session')

  // https://www.npmjs.com/package/express-session
  // https://github.com/mpalmr/yapb/blob/master/server/index.js#L50-L60
  // http://knexjs.org/