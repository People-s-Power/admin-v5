import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import UpdateService from "./update.service";

export const updates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, page, limit } = req.query

    const updates = await new UpdateService("", String(filter)).findAll(Number(limit), Number(page))
    

    return res
        .status(200)
        .json(success("Updates retrieved", { updates }));
  } catch (error) {
    next(error)
  }
}

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const update = await new UpdateService(id ).findOne()
    

    return res
        .status(200)
        .json(success("Update retrieved", { update }));
  } catch (error) {
    next(error)
  }
}



export const editUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params


    const update = await new UpdateService(id ).updateOne(req.body)
    

    return res
        .status(200)
        .json(success("Update updated", { update }));
  } catch (error) {
    next(error)
  }
}

export const deleteUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const param = req.params.id
    const update = await new UpdateService(param).delete()

    return res
        .status(201)
        .json(success("Update Deleted", { update }));
  } catch (error) {
    next(error)
  }
}