import { ObjectId } from "mongoose";
import { Request, NextFunction, Response } from "express";

import UserService from "../user/user.service";
import { AuthenticatedRequest } from "../../../types";
import { hashPassword, matchPassword } from "../../common/hashing";
import { catchError, generateToken, success } from "../../common/utils";
import ProfService from "./prof.service";
import { number } from "../../../swaggerTypes";

export enum AccountTypeEnum {
  Campaigner = 'Campaigner',
  Admin = 'Admin',
  Editor = 'Editor',
  Staff = 'Staff',
  Applicant = 'Applicant',
  Contact = 'Contact',
}

const types: any = [AccountTypeEnum.Admin, AccountTypeEnum.Editor, AccountTypeEnum.Staff]

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, accountType } = req.body;
  try {
    const userService = new UserService(email)
    const isUser = await userService.findOne()
    
    if (isUser) throw catchError("Please login", 400);

    if(!types.includes(accountType)) throw catchError("Please Add a valid account type", 400);

    const user = await userService.create(
      name,
      email,
      password,
      accountType
    )

    return res.status(201).json(
      success(`${accountType} created successfully`, user),
    )
  } catch (error) {
    next(error);
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userService = new UserService(email);
    const user = await userService.findOne()
    if(!user) throw catchError("User not found", 404);
    if(!user.isActive) throw catchError("User suspended", 400);
    if(!types.includes(user.accountType)) throw catchError("User not allowed, become a Editor, Admin or Staff", 400);

    const matched = matchPassword(password, user.password);
    if (!matched) throw catchError("Email/Password is incorrect", 400);

    const token = generateToken({
      id: user._id,
      role: user?.accountType,
      email: user.email,
    });
    const result = userService.getUser(user)
    return res
      .status(200)
      .json(success("Logged in successfully", { user: result }, { token }));
  } catch (error) {
    next(error);
  }
}


export const become = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, accountType } = req.body;

    const userService = new UserService(email);
    let user = await userService.findOne()

    if(!user) throw catchError("User not found", 404);
    if(!user.isActive) throw catchError("User suspended", 400);
    if(!types.includes(accountType)) throw catchError("Please Add a valid account type", 400);

    

    const matched = matchPassword(password, user.password);
    if (!matched) throw catchError("Email/Password is incorrect", 400);

    user = await new UserService("", "", user._id).updateOne({ accountType });

    const token = generateToken({
      id: user._id,
      role: accountType,
      email: user.email,
    });

    const result = userService.getUser(user)
    return res
      .status(200)
      .json(success("Logged in successfully", { user: result }, { token }));
  } catch (error) {
    next(error)
  }
}


export const edit =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.admin
    const user = await new UserService("", "", id).updateOne(req.body)
    const result = new UserService("", "", id).getUser(user)

    return res
    .status(200)
    .json(success("User updated", { user: result }));
  } catch (error) {
    next(error);
  }
}

export const updatePassword =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, password } = req.body
    const { id } = req.admin

    let user = await new UserService("", "", id).findOne()

    const matched = matchPassword(oldPassword, user.password);

    if (!matched) throw catchError("password is incorrect", 400);
    

    user = await new UserService("", "", id).updateOne({ password: hashPassword(password) })

    const result = new UserService("", "", id).getUser(user)

    return res
      .status(200)
      .json(success("Password updated successfully", { user: result }));

  } catch (error) {
    next(error)
  }
}

export const fetchActivities =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query
    const { userId, orgId } = req.body

    const activities = await new ProfService('').fetchActivities(Number(page), Number(limit), userId, orgId)
    return res
      .status(200)
      .json(success("Activities retrieved successfully", { activities }));
  } catch (error) {
    next(error)
  }
}