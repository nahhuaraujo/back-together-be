import axios, { AxiosRequestConfig } from 'axios';
import { Collections } from '../enums';
import { IUser } from '../models';

const findOneUserByEmail = async (email = '') => {
  const config: AxiosRequestConfig = {
    url: `${process.env.MONGODB_DATA_API_URL}/findOne`,
    method: 'post',
    headers: {
      'api-key': process.env.MONGODB_DATA_API_KEY,
    },
    data: {
      dataSource: process.env.MONGODB_DATASOURCE,
      database: process.env.MONGODB_NAME,
      collection: Collections.USERS,
      filter: {
        email,
      },
    },
  };
  const response = await axios(config);
  return response.data.document;
};

const insertOneUser = async (user: Partial<IUser>) => {
  const config: AxiosRequestConfig = {
    url: `${process.env.MONGODB_DATA_API_URL}/insertOne`,
    method: 'post',
    headers: {
      'api-key': process.env.MONGODB_DATA_API_KEY,
    },
    data: {
      dataSource: process.env.MONGODB_DATASOURCE,
      database: process.env.MONGODB_NAME,
      collection: Collections.USERS,
      document: {
        ...user,
      },
    },
  };
  const response = await axios(config);
  return response.data.document;
};

const findAll = async () => {
  const config: AxiosRequestConfig = {
    url: `${process.env.MONGODB_DATA_API_URL}/find`,
    method: 'post',
    headers: {
      'api-key': process.env.MONGODB_DATA_API_KEY,
    },
    data: {
      dataSource: process.env.MONGODB_DATASOURCE,
      database: process.env.MONGODB_NAME,
      collection: Collections.USERS,
      filter: {},
    },
  };
  const response = await axios(config);
  return response.data.documents;
};

export default { findOneUserByEmail, insertOneUser, findAll };
