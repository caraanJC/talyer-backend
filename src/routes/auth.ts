import { NextFunction, Router, Request, Response } from 'express';
import passport from 'passport';

const AuthRouter = Router();

const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    error: 'Unauthorized',
  });
};

AuthRouter.get('/user', checkAuthentication, (req: Request, res: Response) => {
  res.status(200).json({
    user: req.user,
  });
});

AuthRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({
    message: 'Login success',
  });
});

AuthRouter.delete('/logout', (req: Request, res: Response) => {
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
