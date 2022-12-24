import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { authRoutes } from './routes';
import { errorHandler } from './middlewares';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

app.get('/test', (_, res) => {
  res.json({
    message: 'Ok',
  });
});

app.use('/', authRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}!`);
});
