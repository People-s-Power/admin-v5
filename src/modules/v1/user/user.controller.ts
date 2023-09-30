import UserService from "./user.service";
import ErrorCodes from "../../common/errorCodes";
import { matchPassword } from "../../common/hashing";
import { AuthenticatedRequest } from "../../../types";
import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import { ObjectId } from "mongoose";

export const users =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await new UserService().findAll()

    return res
        .status(200)
        .json(success("Users retrieved", { users }));
  } catch (error) {
    next(error);
  }
}

export const singleUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction) => {
  try {
    const param = req.params.id
  
    const user = await new UserService("", "", param).findOne()
    console.log(user)

    const result = await new UserService().getUser(user)

    return res
        .status(200)
        .json(success("User retrieved", { user: result }));
  } catch (error) {
    next(error);
  }

}

export const editUser =async (req: AuthenticatedRequest,
  res: Response,
  next: NextFunction) => {
  try{
    const param = req.params.id
    const user = await new UserService("", "", param).updateOne(req.body)

    return res
    .status(200)
    .json(success("User updated", { user: user }));
  }catch (error) {
    next(error);
  }
}

export const deleteUser =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const param = req.params.id
    const result = await new UserService("", "", param).deleteUser()

    return res
        .status(201)
        .json(success("User Deleted", { user: result }));
  } catch (error) {
    next(error)
  }
}
