import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import EventService from "./event.service";
import ProfService from "../auth/prof.service";

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

export const createEventProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const {
      orgId,
      name, 
      description,
      time,
      startDate,
      audience,
      endDate,
      assets,
      type,
    } = req.body
    await new ProfService(id).checkUser(orgId);

    const event = await new EventService('').create({
      name, 
      description,
      time,
      startDate,
      audience,
      endDate,
      assets,
      type,
      author: orgId
    })

    await new ProfService('').enterActivity('CREATE', id, orgId, `${event.name} was Created`, 'EVENT')

    return res
        .status(201)
        .json(success("Event created successfully", { event }));
  } catch (error) {
    next(error)
  }
}


export const editEventProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const { orgId, edId } = req.body
    await new ProfService(id).checkUser(orgId);
    let event = await new EventService(edId).findOne()
    console.log(event.author, orgId)

    if(event.author !== orgId) throw catchError('Not Allowed', 400)
    
    event = await new EventService(edId).updateOne(req.body)

    await new ProfService('').enterActivity('EDIT', id, orgId, `${event.name} was edited`, 'EVENT')

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

export const deleteEventProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const { orgId, eId } = req.body
    await new ProfService(id).checkUser(orgId);
    let event = await new EventService(eId).findOne()

    if(event.author !== orgId) throw catchError('Not Allowed', 400)

    event = await new EventService(eId).delete()
    await new ProfService('').enterActivity('DELETE', id, orgId, `${event.name} was deleted`, 'EVENT')


    return res
        .status(201)
        .json(success("Event Deleted", { event }));

  } catch (error) {
    next(error)
  }
}