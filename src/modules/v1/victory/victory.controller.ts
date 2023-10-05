import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import VictoryService from "./victory.service";
import ProfService from "../auth/prof.service";

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



export const createVictoryProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const {
      orgId,
      body,
      assets
    } = req.body

    await new ProfService(id).checkUser(orgId);

    const victory = await new VictoryService('').create({
      body,
      assets,
      author: orgId
    })

    await new ProfService('').enterActivity('CREATE', id, orgId, `a victory was Created`, 'VICTORY')

    return res
        .status(201)
        .json(success("Victory created successfully", { victory }));
  } catch (error) {
    next(error)
  }
}


export const editVictoryProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const { orgId, victoryId } = req.body
    await new ProfService(id).checkUser(orgId);
    let victory = await new VictoryService(victoryId).findOne()

    if(victory.author !== orgId) throw catchError('Not Allowed', 400)
    
    victory = await new VictoryService(victoryId).updateOne(req.body)

    await new ProfService('').enterActivity('EDIT', id, orgId, `a victory was edited`, 'VICTORY')

    return res
        .status(200)
        .json(success("Victory updated", { victory }));
  } catch (error) {
    next(error)
  }
}

export const deleteVictoryProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const { orgId, victoryId } = req.body
    await new ProfService(id).checkUser(orgId);
    let victory = await new VictoryService(victoryId).findOne()

    if(victory.author !== orgId) throw catchError('Not Allowed', 400)

    victory = await new VictoryService(victoryId).delete()
    await new ProfService('').enterActivity('DELETE', id, orgId, `a victory was deleted`, 'VICTORY')


    return res
        .status(200)
        .json(success("Victory Deleted", { victory }));

  } catch (error) {
    next(error)
  }
}