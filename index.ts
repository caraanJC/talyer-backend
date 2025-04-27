import express from 'express';
import session from 'express-session';
import passport from 'passport';
import localStrategy from './src/auth/strategies/local';
import authRouter from './src/routes/auth';

import pg from 'pg';
import { PORT, SESSION_SECRET } from './src/config/environment';
import { AppDataSource } from './src/config/AppDataSource';
import { postgresqlConfig } from './src/config/postgresql';
import pgSimple from 'connect-pg-simple';
import profileRouter from './src/routes/profile';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
  origin: ['http://localhost:8000'],
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin"],
  credentials: true,
}));

AppDataSource.initialize()
  .then(() => {
    const pgSession = pgSimple(session);

    const pgPool = new pg.Pool(postgresqlConfig);

    app.use(
      session({
        store: new pgSession({
          pool: pgPool,
          tableName: 'user_sessions',
        }),
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          secure: false,
          httpOnly: false,
          sameSite: "none"
        }, // 30 days
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(localStrategy);

    passport.serializeUser((userObj, done) => {
      done(null, userObj);
    });

    passport.deserializeUser((userObj, done) => {
      done(null, userObj || null);
    });

    app.get('/', (req, res, next) => {
      res.status(200).json({
        message: 'Hello World',
      });
    });

    app.use('/auth', authRouter);
    app.use('/profile', profileRouter);

    app.listen(PORT, () => {
      console.log(`App listening on PORT ${PORT}`);
    });
  })
  .catch((err) => console.error('Database connection error:', err));
