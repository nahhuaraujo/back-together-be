import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ErrorMessages, SuccessMessages } from '../enums';
import { HttpError, IReport } from '../models';
import { reportService } from '../services';
import { ObjectId } from 'mongodb';
import { UploadedFile } from 'express-fileupload';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Error de input', 422));
  }

  const img: UploadedFile = req.files?.img as UploadedFile;

  img.mv(`${process.cwd()}/img/pets/${new Date() + img.name}`, error => {
    if (error) {
      return console.log((error as Error).message);
    }
    console.log('Success');
  });

  console.log('FormData Img:', req.body.img);

  try {
    const report: Partial<IReport> = {
      pet: {
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        sex: req.body.sex,
        description: req.body.description,
        img: req.body.img,
      },
      user: {
        _id: new ObjectId(req.body._id),
        email: req.body.email,
        phone: req.body.phone,
      },
      type: req.body.type,
      location: req.body.location,
      reward: req.body.reward,
    };

    // await reportService.insertOne(report);
    // res.status(201).json({
    //   success: true,
    //   payload: SuccessMessages.REPORT_CREATED,
    // });
  } catch (e) {
    next(new HttpError('No fue posible crear el reporte, intente nuevamente mas tarde', 500));
  }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Error de input', 422));
  }
  try {
    const report = await reportService.findOne(req.body.id);
    if (!report) return next(new HttpError(ErrorMessages.REPORT_NOT_FOUND, 404));
    return res.json({
      success: true,
      payload: {
        ...report,
      },
    });
  } catch (e) {
    next(new HttpError('Por el momento no es posible recuperar el reporte, intente nuevamente mas tarde'));
  }
};

const findAll = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const reports = await reportService.findAll();
    return res.json({
      success: true,
      payload: reports || [],
    });
  } catch (e) {
    next(new HttpError('Por el momento no es posible recuperar los reportes, intente nuevamente mas tarde', 500));
  }
};

export default { create, findById, findAll };
