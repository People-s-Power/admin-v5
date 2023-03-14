import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import ReportService from "./report.service";

export const reports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, page, limit } = req.query

    const reports = await new ReportService("", String(filter)).findAll(Number(limit), Number(page))
    

    return res
        .status(200)
        .json(success("Reports retrieved", { reports }));
  } catch (error) {
    next(error)
  }
}

export const report = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const report = await new ReportService(id ).findOne()
    

    return res
        .status(200)
        .json(success("Report retrieved", { report }));
  } catch (error) {
    next(error)
  }
}



export const editReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params


    const report = await new ReportService(id ).updateOne(req.body)
    

    return res
        .status(200)
        .json(success("Report updated", { report }));
  } catch (error) {
    next(error)
  }
}

export const deleteReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const param = req.params.id
    const report = await new ReportService(param).delete()

    return res
        .status(201)
        .json(success("Report Deleted", { report }));
  } catch (error) {
    next(error)
  }
}