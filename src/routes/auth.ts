import { NextFunction, Router, Request, Response } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/AppDataSource';
import { User } from '../entities/User';
import { checkAuthentication, mustBeLoggedOut } from '../helpers/auth';

const AuthRouter = Router();

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  return hash;
};

AuthRouter.post('/signUp', async (req, res) => {
  try {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    const name = body.name;

    const hashedPassword = await hashPassword(password);

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({email: email});

    if (user) {
      throw new Error('Account already exists');
    }

    await userRepository.save({
      email,
      name: name,
      password: hashedPassword,
    });

    res.status(200).json({
      message: 'Registration Successful.',
    });
  } catch (error: any) {
    // console.log(error);

    res.status(400).json({
      error: error.message,
    });
  }

});

AuthRouter.post('/signIn', mustBeLoggedOut, passport.authenticate('local'), async (req, res) => {
  try {
    res.status(200).json({
      message: 'Login success',
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      error: error.message,
    });
  }
});

AuthRouter.delete('/signOut', checkAuthentication, (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      res.status(400).json({
        error: err?.message || err,
      });
    } else {
      res.status(204).send();
    }
  });
});

export default AuthRouter;
