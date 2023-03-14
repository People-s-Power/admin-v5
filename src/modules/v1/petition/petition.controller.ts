import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import PetitionService from "./petition.service";

export const petitons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, page, limit } = req.query

    const petitons = await new PetitionService("", String(filter)).findAll(Number(limit), Number(page))
    

    return res
        .status(200)
        .json(success("User retrieved", { petitons }));
  } catch (error) {
    next(error)
  }
}

export const petiton = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const petiton = await new PetitionService(id ).findOne()
    

    return res
        .status(200)
        .json(success("User retrieved", { petiton }));
  } catch (error) {
    next(error)
  }
}



export const editPetiton = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params


    const petiton = await new PetitionService(id ).updateOne(req.body)
    

    return res
        .status(200)
        .json(success("Petition updated", { petiton }));
  } catch (error) {
    next(error)
  }
}

export const deletePetition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const param = req.params.id
    const petiton = await new PetitionService(param).delete()

    return res
        .status(201)
        .json(success("User Deleted", { petiton }));
  } catch (error) {
    next(error)
  }
}