import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import EventService from "./event.service";

export const events = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, page, limit } = req.query

    const events = await new EventService("", String(filter)).findAll(Number(limit), Number(page))
    

    return res
        .status(200)
        .json(success("Events retrieved", { events }));
  } catch (error) {
    next(error)
  }
}

export const event = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const event = await new EventService(id ).findOne()
    

    return res
        .status(200)
        .json(success("Event retrieved", { event }));
  } catch (error) {
    next(error)
  }
}



export const editEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params


    const event = await new EventService(id ).updateOne(req.body)
    

    return res
        .status(200)
        .json(success("Event updated", { event }));
  } catch (error) {
    next(error)
  }
}

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const param = req.params.id
    const event = await new EventService(param).delete()

    return res
        .status(201)
        .json(success("Event Deleted", { event }));
  } catch (error) {
    next(error)
  }
}