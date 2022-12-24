import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import { ErrorMessages, IUser, SuccessMessages, ValidationErrors } from '../models';

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

  const mongoURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@backtogether.ofcs22e.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(mongoURL);
  await client.connect();
  const db = client.db('BackTogether');
  const users = db.collection('Users');

  try {
    const foundUser = await users.findOne({ email });
    client.close();

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

  const mongoURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@backtogether.ofcs22e.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(mongoURL);
  await client.connect();
  const db = client.db('BackTogether');
  const users = db.collection('Users');

  try {
    const user = await users.findOne({ email });
    if (user) {
      return res.json({
        message: ErrorMessages.EMAIL_EXISTS_ALREADY,
      });
    }

    const encryptedPassword = bcrypt.hashSync(password as string, 10);
    await users.insertOne({ email, password: encryptedPassword, phone });

    client.close();

    res.statusCode = 201;
    return res.json({
      message: SuccessMessages.REGISTERED_SUCCESSFULLY,
    });
  } catch (e) {
    console.log((e as Error).message);
    return next(e);
  }
};
