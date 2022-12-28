import axios from 'axios';
import { IUser } from '../../models';

export const findOneUser = async (email = '') => {
  const config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-cyjnd/endpoint/data/v1/action/findOne',
    headers: {
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
  const config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-cyjnd/endpoint/data/v1/action/insertOne',
    headers: {
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
