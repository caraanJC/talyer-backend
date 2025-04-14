import { NextFunction, Request, Response } from "express";

export const checkAuthentication = (
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

export const mustBeLoggedOut = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  res.status(400).json({
    error: 'Already logged in.',
  });
};