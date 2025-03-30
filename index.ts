import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import localStrategy from './src/auth/strategies/local';
import authRouter from './src/routes/auth';

import pg from 'pg';
import pgSession from 'connect-pg-simple';

dotenv.config();

const PORT = Number(process.env.PORT || '3001');
const SESSION_SECRET = process.env.SESSION_SECRET || 'chibi';
const PG_HOST = process.env.PG_HOST || 'localhost'
const PG_DATABASE = process.env.PG_DATABASE || 'talyer'
const PG_USER = process.env.PG_USER || 'postgress'
const PG_PASSWORD = process.env.PG_PASSWORD || 'password'
const PG_PORT = process.env.PG_PORT || 5432

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const pgPool = new pg.Pool({
  database: PG_DATABASE,
  user: PG_USER,
  password: PG_PASSWORD,
  host: PG_HOST,
  port: Number(PG_PORT)
});

app.use(
  session({
    store: new (pgSession(session))({
      pool: pgPool,
      tableName: 'user_sessions'
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
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

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));