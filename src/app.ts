import cors from 'cors';
import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
// import multer from 'multer';
import { errorHandler } from './middlewares';
import fileUpload from 'express-fileupload';
import { authRoutes, reportRoutes, userRoutes } from './routes';

dotenv.config();

// const storage = multer.diskStorage({
//   destination(_req, _file, callback) {
//     callback(null, '/img');
//   },
//   filename(_req, file, callback) {
//     console.log(file.originalname);
//     callback(null, file.originalname);
//   },
// });

const app = express();
// const upload = multer({ storage }).single('img');

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());
app.use(fileUpload());
app.use(urlencoded({ extended: true }));
app.use('/img/pets', express.static('img/pets'));

app.get('/test', (_, res) => {
  res.json({
    message: 'Ok',
  });
});

app.use('/', authRoutes);
app.use('/report', reportRoutes);
// TODO AUTH MIDDLEWARE
app.use('/user', userRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}!`);
});
