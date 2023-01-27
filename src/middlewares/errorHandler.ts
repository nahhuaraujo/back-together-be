import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpError } from '../models';

export const errorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.code === 401) {
    return res.json({
      success: false,
      payload: error.message,
    });
  }

  if (error.code === 422) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgs: string[] = [];
      errors.array().forEach(error => {
        errorMsgs.push(error.msg);
      });
      return res.status(422).json({
        success: false,
        payload: errorMsgs,
      });
    }
  }

  return res.status(error.code || 500).json({
    success: false,
    payload: error.message,
  });
};
