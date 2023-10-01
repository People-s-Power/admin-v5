import { ObjectId } from "mongoose";
import { Request, NextFunction, Response } from "express";

import UserService from "../user/user.service";
import { AuthenticatedRequest } from "../../../types";
import { hashPassword, matchPassword } from "../../common/hashing";
import { catchError, generateToken, success } from "../../common/utils";

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
    console.log(user)
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