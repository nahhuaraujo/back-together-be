import { MongoClient } from 'mongodb';
import { Collections } from '../enums';
import { IUser } from '../models';

const findOneUserByEmail = async (email = '') => {
  const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@backtogether.tjh2tas.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(process.env.MONGO_DB_NAME);
    const users = db.collection(Collections.USERS);
    return await users.findOne({ email });
  } catch (e) {
    throw new Error((e as Error).message);
  } finally {
    client.close();
  }
};

const insertOneUser = async (user: Partial<IUser>) => {
  const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@backtogether.tjh2tas.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(process.env.MONGO_DB_NAME);
    const users = db.collection(Collections.USERS);
    await users.insertOne({ ...user });
  } catch (e) {
    throw new Error((e as Error).message);
  } finally {
    client.close();
  }
};

export default { findOneUserByEmail, insertOneUser };
