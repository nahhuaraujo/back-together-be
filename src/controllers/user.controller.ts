import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpError } from '../models';
import { userService } from '../services';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Error de input', 422));
  }
  try {
    const users = await userService.findAll();
    return res.json({
      success: true,
      payload: [...users],
    });
  } catch (e) {
    return next(new HttpError('No es posible iniciar sesion por el momento, intente nuevamente mas tarde'));
  }
};

export default { findAll };
