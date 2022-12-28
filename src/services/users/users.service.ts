import axios, { AxiosRequestConfig } from 'axios';
import { IUser } from '../../models';

export const findOneUser = async (email = '') => {
  const config: AxiosRequestConfig = {
    url: 'https://data.mongodb-api.com/app/data-cyjnd/endpoint/data/v1/action/findOne',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.MONGO_DATA_API_KEY,
    },
    data: {
      dataSource: 'BackTogether',
      database: 'BackTogether',
      collection: 'Users',
      filter: {
        email,
      },
    },
  };

  const response = await axios(config);
  return response.data.document;
};

export const insertOneUser = async (user: IUser) => {
  const config: AxiosRequestConfig = {
    url: 'https://data.mongodb-api.com/app/data-cyjnd/endpoint/data/v1/action/insertOne',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.MONGO_DATA_API_KEY,
    },
    data: {
      dataSource: 'BackTogether',
      database: 'BackTogether',
      collection: 'Users',
      document: {
        ...user,
      },
    },
  };

  const response = await axios(config);
  return response.data.insertedId;
};
