import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import UpdateService from "./update.service";
import ProfService from "../auth/prof.service";

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

export const createUpdateProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const {
      orgId,
      body,
      assets,
      category,
      petition
    } = req.body

    await new ProfService(id).checkUser(orgId);

    const update = await new UpdateService('').create({
      body,
      assets,
      category,
      author: orgId,
      petition
    })

    await new ProfService('').enterActivity('CREATE', id, orgId, `A petition update was Created`, 'UPDATE')

    return res
        .status(201)
        .json(success("Petition update created successfully", { update }));
  } catch (error) {
    next(error)
  }
}


export const editUpdateProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const { orgId, updateId } = req.body
    await new ProfService(id).checkUser(orgId);
    let update = await new UpdateService(updateId).findOne()

    if(update.author !== orgId) throw catchError('Not Allowed', 400)
    
    update = await new UpdateService(updateId).updateOne(req.body)

    await new ProfService('').enterActivity('EDIT', id, orgId, ` edited a petition update`, 'UPDATE')

    return res
        .status(200)
        .json(success("Petition update updated", { update }));
  } catch (error) {
    next(error)
  }
}

export const deleteUpdateProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const { orgId, updateId } = req.body
    await new ProfService(id).checkUser(orgId);
    let update = await new UpdateService(updateId).findOne()

    if(update.author !== orgId) throw catchError('Not Allowed', 400)

    update = await new UpdateService(updateId).delete()
    await new ProfService('').enterActivity('DELETE', id, orgId, ` deleted a petition update`, 'UPDATE')


    return res
        .status(200)
        .json(success("Petition update Deleted", { update }));

  } catch (error) {
    next(error)
  }
}