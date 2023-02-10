import { ObjectId } from 'mongodb';
import { IPet, IUser } from './';

export interface IReport {
  _id: ObjectId;
  pet: IPet;
  user: IUser;
  type: 'found' | 'lost';
  location: string;
  createdAt: number;
  reward: boolean;
}
