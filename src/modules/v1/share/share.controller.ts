import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import ShareService from "./share.service";

export const shares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, page, limit } = req.query

    const shares = await new ShareService("", String(filter)).findAll(Number(limit), Number(page))
    

    return res
        .status(200)
        .json(success("shares retrieved", { shares }));
  } catch (error) {
    next(error)
  }
}

export const share = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const share = await new ShareService(id ).findOne()
    

    return res
        .status(200)
        .json(success("share retrieved", { share }));
  } catch (error) {
    next(error)
  }
}



export const editShare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params


    const share = await new ShareService(id ).updateOne(req.body)
    

    return res
        .status(200)
        .json(success("Share updated", { share }));
  } catch (error) {
    next(error)
  }
}

export const deleteShare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const param = req.params.id
    const share = await new ShareService(param).delete()

    return res
        .status(201)
        .json(success("Share Deleted", { share }));
  } catch (error) {
    next(error)
  }
}