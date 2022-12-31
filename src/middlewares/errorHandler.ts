import { Response, Request, NextFunction } from 'express';

interface IError {
  message: string;
}

export const errorHandler = (error: IError, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  console.log('Error Handler:', error);

  return res.json({
    error: error.message,
  });
};
