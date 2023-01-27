import cors from 'cors';
import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import fileUpload from 'express-fileupload';
import { authHandler, errorHandler } from './middlewares';
import { authRoutes, reportRoutes, userRoutes } from './routes';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());
app.use(fileUpload());
app.use(urlencoded({ extended: true }));
app.use('/api/img/pets', express.static('img/pets'));

app.get('/api/test', (_, res) => {
  res.json({
    success: true,
    payload: 'Server up and running!!',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

app.use('*', (_, res) => {
  res.status(404).json({
    success: false,
    payload: 'El recurso no fue encontrado',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}!`);
});
