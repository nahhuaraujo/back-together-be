import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorMessages } from '../enums';
import { HttpError } from '../models';

export const authHandler = (req: Request, _: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return next(new HttpError(ErrorMessages.NOT_AUTH, 401));
  }

  try {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (e) {
    return next(new HttpError(ErrorMessages.SESSION_EXPIRED, 401));
  }
};
