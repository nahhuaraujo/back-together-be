import { MongoClient, ObjectId } from 'mongodb';
import { Collections } from '../enums';
import { IReport } from '../models';

const findOne = async (id = '') => {
  const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@backtogether.tjh2tas.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(process.env.MONGO_DB_NAME);
    const reports = db.collection(Collections.REPORTS);
    return await reports.findOne({ _id: new ObjectId(id) });
  } catch (e) {
    throw new Error((e as Error).message);
  } finally {
    client.close();
  }
};

const insertOne = async (report: IReport) => {
  const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@backtogether.tjh2tas.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);
  try {
    report.user._id = new ObjectId(report.user._id);
    await client.connect();
    const db = client.db(process.env.MONGO_DB_NAME);
    const reports = db.collection(Collections.REPORTS);
    await reports.insertOne(report);
  } catch (e) {
    throw new Error((e as Error).message);
  } finally {
    client.close();
  }
};

const findAll = async () => {
  const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@backtogether.tjh2tas.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(process.env.MONGO_DB_NAME);
    const reports = db.collection(Collections.REPORTS);
    return await reports.find().toArray();
  } catch (e) {
    throw new Error((e as Error).message);
  } finally {
    client.close();
  }
};

export default { findOne, insertOne, findAll };
