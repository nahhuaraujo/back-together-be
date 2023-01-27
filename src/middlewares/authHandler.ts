import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../models';
import { ErrorMessages } from '../enums';
import jwt from 'jsonwebtoken';

export const authHandler = (req: Request, _: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return next(new HttpError(ErrorMessages.NOT_AUTH, 401));
  }

  try {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (e) {
    return next(new HttpError(ErrorMessages.SESSION_EXPIRED, 401));
  }
};
