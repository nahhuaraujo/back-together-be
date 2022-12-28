import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorMessages, IUser, SuccessMessages, ValidationErrors } from '../models';
import { findOneUser, insertOneUser } from '../services';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: IUser = req.body;

  if (!email) {
    return res.json({
      message: ValidationErrors.EMAIL_IS_REQUIRED,
    });
  }
  if (!password) {
    return res.json({
      message: ValidationErrors.PASSWORD_IS_REQUIRED,
    });
  }

  try {
    const foundUser = await findOneUser(email);
    if (!foundUser) return next(new Error(ErrorMessages.EMAIL_NOT_FOUND));

    const isPassOk = bcrypt.compareSync(password as string, foundUser.password as string);
    if (!isPassOk) {
      return next(new Error(ErrorMessages.EMAIL_NOT_REGISTERED));
    }

    delete foundUser.password;

    return res.json({
      ...foundUser,
      token: jwt.sign(foundUser, process.env.TOKEN_SECRET as string, { expiresIn: '10m' }),
    });
  } catch (e) {
    console.log((e as Error).message);
    return next(e);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, phone }: IUser = req.body;

  if (!email) {
    return res.json({
      message: ValidationErrors.EMAIL_IS_REQUIRED,
    });
  }
  if (!password) {
    return res.json({
      message: ValidationErrors.PASSWORD_IS_REQUIRED,
    });
  }
  if (!phone) {
    return res.json({
      message: ValidationErrors.PHONE_IS_REQUIRED,
    });
  }

  try {
    const foundUser = await findOneUser(email);

    if (foundUser) {
      return res.json({
        message: ErrorMessages.EMAIL_EXISTS_ALREADY,
      });
    }

    const encryptedPassword = bcrypt.hashSync(password as string, 10);
    await insertOneUser({ email, password: encryptedPassword, phone });

    res.statusCode = 201;
    return res.json({
      message: SuccessMessages.REGISTERED_SUCCESSFULLY,
    });
  } catch (e) {
    console.log((e as Error).message);
    return next(e);
  }
};
