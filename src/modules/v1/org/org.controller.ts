import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import OrgService from "./org.service";

export const orgs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, page, limit } = req.query

    const Organizations = await new OrgService("", String(filter)).findAll(Number(limit), Number(page))
    

    return res
        .status(200)
        .json(success("Organization retrieved", { Organizations }));
  } catch (error) {
    next(error)
  }
}

export const organization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const organization = await new OrgService(id).findOne()
    

    return res
        .status(200)
        .json(success("Organization retrieved", { organization }));
  } catch (error) {
    next(error)
  }
}



export const editOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params


    const organization = await new OrgService(id ).updateOne(req.body)
    

    return res
        .status(200)
        .json(success("Organization updated", { organization }));
  } catch (error) {
    next(error)
  }
}

export const deleteOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const param = req.params.id
    const organization = await new OrgService(param).delete()

    return res
        .status(201)
        .json(success("Organization Deleted", { organization }));
  } catch (error) {
    next(error)
  }
}