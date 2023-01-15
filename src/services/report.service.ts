import axios, { AxiosRequestConfig } from 'axios';
import { Collections } from '../enums';
import { IReport } from '../models';

const findOne = async (id = '') => {
  const config: AxiosRequestConfig = {
    url: `${process.env.MONGODB_DATA_API_URL}/findOne`,
    method: 'post',
    headers: {
      'api-key': process.env.MONGODB_DATA_API_KEY,
    },
    data: {
      dataSource: process.env.MONGODB_DATASOURCE,
      database: process.env.MONGODB_NAME,
      collection: Collections.REPORTS,
      filter: {
        _id: { $oid: id },
      },
    },
  };
  const response = await axios(config);
  return response.data.document;
};

const insertOne = async (report: Partial<IReport>) => {
  const config: AxiosRequestConfig = {
    url: `${process.env.MONGODB_DATA_API_URL}/insertOne`,
    method: 'post',
    headers: {
      'api-key': process.env.MONGODB_DATA_API_KEY,
    },
    data: {
      dataSource: process.env.MONGODB_DATASOURCE,
      database: process.env.MONGODB_NAME,
      collection: Collections.REPORTS,
      document: {
        ...report,
      },
    },
  };
  const response = await axios(config);
  return response.data;
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
      collection: Collections.REPORTS,
      filter: {},
    },
  };
  const response = await axios(config);
  return response.data.documents;
};

export default { findOne, insertOne, findAll };
