import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import PetitionService from "./petition.service";
import ProfService from "../auth/prof.service";

export const petitons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { filter, page, limit, authorId} = req.query

    if (String(authorId) === 'undefined') {
      authorId = null
    }
  


    const petitons = await new PetitionService("", String(filter)).findAll(Number(limit), Number(page), authorId)
    

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

export const createPetitionProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const {
      orgId,
      title,
      category,
      assets,
      aim,
      target,
      body,
      country,
    } = req.body
    await new ProfService(id).checkUser(orgId);

    const petition = await new PetitionService('').create({
      title,
      category,
      assets,
      aim,
      target,
      body,
      author: orgId,
      excerpt: body.split(' ').splice(0, 36).join(' '),
      slug: title.split(' ').join('-').toLowerCase(),
      numberOfPaidEndorsementCount: 0,
      numberOfPaidViewsCount: 0,
      region: country
    })

    await new ProfService('').enterActivity('CREATE', id, orgId, `${petition.title} was Created`, 'PETITION')

    return res
        .status(201)
        .json(success("Petition created successfully", { petition }));
  } catch (error) {
    next(error)
  }
}


export const editPetitonProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const { orgId, petitionId } = req.body
    await new ProfService(id).checkUser(orgId);
    let petition = await new PetitionService(petitionId).findOne()

    if(petition.author !== orgId) throw catchError('Not Allowed', 400)
    
    petition = await new PetitionService(petitionId).updateOne(req.body)

    await new ProfService('').enterActivity('EDIT', id, orgId, `${petition.title} was edited`, 'PETITION')

    return res
        .status(200)
        .json(success("Petition updated", { petition }));
  } catch (error) {
    next(error)
  }
}

export const deletePetitionProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const { orgId, petitionId } = req.body
    await new ProfService(id).checkUser(orgId);
    let petition = await new PetitionService(petitionId).findOne()

    if(petition.author !== orgId) throw catchError('Not Allowed', 400)

    petition = await new PetitionService(petitionId).delete()
    await new ProfService('').enterActivity('DELETE', id, orgId, `${petition.title} was deleted`, 'PETITION')


    return res
        .status(200)
        .json(success("Petiton Deleted", { petition }));

  } catch (error) {
    next(error)
  }
}