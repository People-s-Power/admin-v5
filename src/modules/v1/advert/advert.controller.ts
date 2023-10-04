import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import AdvertService from "./advert.service";
import ProfService from "../auth/prof.service";

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

export const createAdvertProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const {
      orgId,
      caption,
      message,
      action,
      audience,
      duration,
      email,
      link,
      assets,
      state,
      country
    } = req.body
    await new ProfService(id).checkUser(orgId);

    const advert = await new AdvertService('').create({
      caption,
      message,
      action,
      audience,
      duration,
      email,
      link,
      assets,
      state,
      country,
      author: orgId
    })

    await new ProfService('').enterActivity('CREATE', id, orgId, `${advert.caption} was Created`, 'ADVERT')

    return res
        .status(201)
        .json(success("Advert created successfully", { advert }));
  } catch (error) {
    next(error)
  }
}

export const editAdvertProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const { orgId, adId } = req.body
    await new ProfService(id).checkUser(orgId);
    let advert = await new AdvertService(adId).findOne()

    if(advert.author !== orgId) throw catchError('Not Allowed', 400)
    
    advert = await new AdvertService(adId).updateOne(req.body)

    await new ProfService('').enterActivity('EDIT', id, orgId, `${advert.caption} was edited`, 'ADVERT')

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

export const deleteAdvertProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const { orgId, adId } = req.body
    await new ProfService(id).checkUser(orgId);
    let advert = await new AdvertService(adId).findOne()

    if(advert.author !== orgId) throw catchError('Not Allowed', 400)

    await new ProfService('').enterActivity('DELETE', id, orgId, `${advert.caption} was edited`, 'ADVERT')
    advert = await new AdvertService(adId).delete()


    return res
        .status(201)
        .json(success("Advert Deleted", { advert }));

  } catch (error) {
    next(error)
  }
}