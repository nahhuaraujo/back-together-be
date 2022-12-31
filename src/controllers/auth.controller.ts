import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { ErrorMessages, SuccessMessages } from '../enums';
import { IUser } from '../models';
import { userService } from '../services';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsgs: string[] = [];
    errors.array().forEach(error => {
      errorMsgs.push(error.msg);
    });
    return res.status(422).json({
      status: 'error',
      payload: errorMsgs,
    });
  }

  const { email, password }: IUser = req.body;
  try {
    const foundUser = await userService.findOneUserByEmail(email);
    if (!foundUser)
      return res.status(404).json({
        status: 'error',
        payload: ErrorMessages.EMAIL_NOT_FOUND,
      });

    const isPassOk = bcrypt.compareSync(password as string, foundUser.password as string);
    if (!isPassOk)
      return res.status(404).json({
        status: 'error',
        payload: ErrorMessages.EMAIL_NOT_REGISTERED,
      });

    delete foundUser.password;

    return res.json({
      ...foundUser,
      token: jwt.sign(foundUser, process.env.TOKEN_SECRET as string, { expiresIn: '10m' }),
    });
  } catch (e) {
    return next(e);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsgs: string[] = [];
    errors.array().forEach(error => {
      errorMsgs.push(error.msg);
    });
    return res.status(422).json({
      status: 'error',
      payload: errorMsgs,
    });
  }

  const { email, password, phone }: IUser = req.body;
  try {
    const foundUser = await userService.findOneUserByEmail(email);

    if (foundUser) {
      return res.status(422).json({
        status: 'error',
        payload: ErrorMessages.EMAIL_EXISTS_ALREADY,
      });
    }

    const encryptedPassword = bcrypt.hashSync(password as string, 10);
    await userService.insertOneUser({ email, password: encryptedPassword, phone });

    return res.status(201).json({
      message: SuccessMessages.REGISTERED_SUCCESSFULLY,
    });
  } catch (e) {
    return next(e);
  }
};

export default { login, register };
