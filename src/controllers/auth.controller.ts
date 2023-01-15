import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { ErrorMessages, SuccessMessages } from '../enums';
import { HttpError, IUser } from '../models';
import { userService } from '../services';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Error de input', 422));
  }
  try {
    const { email, password }: IUser = req.body;

    const userFound = await userService.findOneUserByEmail(email);
    if (!userFound) return next(new HttpError(ErrorMessages.EMAIL_NOT_FOUND, 401));

    const isPassOk = bcrypt.compareSync(password as string, userFound.password as string);
    if (!isPassOk) return next(new HttpError(ErrorMessages.EMAIL_NOT_REGISTERED, 401));

    delete userFound.password;

    return res.json({
      success: true,
      payload: {
        ...userFound,
        token: jwt.sign(userFound, process.env.TOKEN_SECRET as string, { expiresIn: '10m' }),
      },
    });
  } catch (e) {
    return next(new HttpError('No es posible iniciar sesion por el momento, intente nuevamente mas tarde'));
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Error de input', 422));
  }
  try {
    const { email, password, phone }: IUser = req.body;
    const userFound = await userService.findOneUserByEmail(email);

    if (userFound) return next(new HttpError(ErrorMessages.EMAIL_EXISTS_ALREADY, 422));

    const encryptedPassword = bcrypt.hashSync(password as string, 10);
    await userService.insertOneUser({ email, password: encryptedPassword, phone });

    return res.status(201).json({
      message: SuccessMessages.REGISTERED_SUCCESSFULLY,
    });
  } catch (e) {
    return next(new HttpError('No es posible registrarse por el momento, intente nuevamente mas tarde'));
  }
};

export default { login, register };
