import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ErrorMessages, SuccessMessages } from '../enums';
import { IReport } from '../models';
import { reportService } from '../services';

const createReport = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsgs: string[] = [];
    errors.array().forEach(error => {
      errorMsgs.push(error.msg);
    });
    return res.status(422).json({
      status: 'error',
      payload: errorMsgs,
    });
  }

  try {
    const report: IReport = req.body;
    await reportService.insertOne({ ...report });
    res.status(201).json({
      status: 'success',
      payload: SuccessMessages.REPORT_CREATED,
    });
  } catch (e) {
    next(e);
  }
};

const findReportById = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsgs: string[] = [];
    errors.array().forEach(error => {
      errorMsgs.push(error.msg);
    });
    return res.status(422).json({
      status: 'error',
      payload: errorMsgs,
    });
  }

  const id = req.body;
  try {
    const foundReport = await reportService.findOne(id);
    if (!foundReport)
      return res.status(404).json({
        success: 'error',
        payload: ErrorMessages.REPORT_NOT_FOUND,
      });

    return res.json({
      status: 'success',
      payload: {
        ...foundReport,
      },
    });
  } catch (e) {
    next(e);
  }
};

const findAll = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const reports = await reportService.findAll();
    return res.json({
      status: 'success',
      payload: reports || [],
    });
  } catch (e) {
    next(e);
  }
};

export default { createReport, findReportById, findAll };
