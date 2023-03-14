import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import VictoryService from "./victory.service";

export const victories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, page, limit } = req.query

    const victories = await new VictoryService("", String(filter)).findAll(Number(limit), Number(page))
    

    return res
        .status(200)
        .json(success("victories retrieved", { victory: victories }));
  } catch (error) {
    next(error)
  }
}

export const victroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const victory = await new VictoryService(id ).findOne()
    

    return res
        .status(200)
        .json(success("Victory retrieved", { victory }));
  } catch (error) {
    next(error)
  }
}



export const editVictory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params


    const victory = await new VictoryService(id ).updateOne(req.body)
    

    return res
        .status(200)
        .json(success("Victory updated", { victory }));
  } catch (error) {
    next(error)
  }
}

export const deleteVictory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const param = req.params.id
    const victory = await new VictoryService(param).delete()

    return res
        .status(201)
        .json(success("Victory Deleted", { victory }));
  } catch (error) {
    next(error)
  }
}