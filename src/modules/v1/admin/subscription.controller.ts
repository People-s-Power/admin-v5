import { ObjectId } from "mongoose";
import { Request, NextFunction, Response } from "express";

import SubscriptionService from "./subscription.service";
import { success } from "../../common/utils";

export const getAll =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query

  const data = await new SubscriptionService('').find(Number(page), Number(limit))

  return res.status(200).json(
    success('subscriptions retrieved successfully', data),
  )
}

export const getOne =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, orgId } = req.body

  const subscription = await new SubscriptionService('').findOne(id, orgId)

  return res.status(200).json(
    success('subscriptions retrieved successfully', subscription),
  );
}

export const getUassiged =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query

  const data = await new SubscriptionService('').getUnassigedSubscriptions(Number(page), Number(limit))

  return res.status(200).json(
    success('subscriptions retrieved successfully', data),
  )
}