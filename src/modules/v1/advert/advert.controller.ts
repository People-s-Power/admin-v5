import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import AdvertService from "./advert.service";

export const adverts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, page, limit } = req.query

    const adverts = await new AdvertService("", String(filter)).findAll(Number(limit), Number(page))
    

    return res
        .status(200)
        .json(success("Adverts retrieved", { adverts }));
  } catch (error) {
    next(error)
  }
}

export const advert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const advert = await new AdvertService(id).findOne()
    

    return res
        .status(200)
        .json(success("Advert retrieved", { advert }));
  } catch (error) {
    next(error)
  }
}



export const editAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params


    const advert = await new AdvertService(id ).updateOne(req.body)
    

    return res
        .status(200)
        .json(success("Advert updated", { advert }));
  } catch (error) {
    next(error)
  }
}

export const deleteAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const param = req.params.id
    const advert = await new AdvertService(param).delete()

    return res
        .status(201)
        .json(success("Advert Deleted", { advert }));
  } catch (error) {
    next(error)
  }
}