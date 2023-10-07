import { ObjectId } from "mongoose";
import { Request, NextFunction, Response } from "express";

import AdminService from "./admin.service";
import UserService from "../user/user.service";
import OrgService from "../org/org.service";
import PostService from "../post/post.service";
import PetitionService from "../petition/petition.service";
import Eventservice from "../event/event.service";
import AdvertService from "../advert/advert.service";
import ShareService from "../share/share.service";
import VictoryService from "../victory/victory.service";
import { AuthenticatedRequest } from "../../../types";
import { hashPassword, matchPassword } from "../../common/hashing";
import { catchError, generateToken, success } from "../../common/utils";

export const addAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role, email, address, lastName, password, firstName, phoneNumber } = req.body;
  try {
    const newAdmin = await new AdminService(email, phoneNumber).create({
      email,
      address,
      lastName,
      password: hashPassword(password),
      firstName,
      phoneNumber,
      role,
      isActive: true,
    });

    return res.status(201).json(
      success('Admin added successfully', newAdmin),
    )
  } catch (error) {
    next(error);
  }
}

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { 
      category,
      subCategory,
      country,
      city,
      userId,
      message,
     } = req.body;

     const messageRes = await new AdminService().sendMessage({
        category,
        subCategory,
        country,
        city,
        userId,
        message,
     })

     return res.status(201).json(
      success('Message sent successfully', messageRes),
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
  const { email, password } = req.body;
  try {
    const service = new AdminService(email);
    const admin = await service.findOne().catch(() => {
      throw catchError("An error occured");
    });

    if (!admin) throw catchError("Email/Password is incorrect");
    if (!admin.isActive) throw catchError("Your account is suspended");

    const matched = matchPassword(password, admin.password);
    if (!matched) throw catchError("Email/Password is incorrect");

    // generate token
    const token = generateToken({
      id: admin._id,
      role: admin?.role,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
    });

    const result = service.getAdmin(admin)

    return res
      .status(200)
      .json(success("Logged in successfully", { admin: result }, { token }));
  } catch (error) {
    next(error);
  }
};

export const profile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.admin;
  try {
    const adminId = id;
    const admin = await new AdminService('', '', adminId)
      .findOne()
      .catch(() => {
        throw catchError("An error occurred");
      });

    if (!admin || !admin.isActive) throw catchError("Invalid account");

    return res.status(200).json(
      success("Profile retrieved successfully", {
        user: new AdminService().getAdmin(admin),
      })
    );
  } catch (error) {
    next(error);
  }
};

export const editProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    admin: { id },
    body: { address, lastName, isActive, firstName, phoneNumber, newPassword },
  } = req;
  try {
    const adminId = id
    const admin = await new AdminService("", "", adminId)
      .findOne()
      .catch(() => {
        throw catchError("An error occurred!", 500);
      });

    if (!admin) throw catchError("Admin does not exist", 404);

    const hashedPassword = newPassword ? hashPassword(newPassword) : null;

    const newAdmin = await new AdminService(
      admin?.email,
      admin?.phoneNumber,
      adminId
    )
      .updateOne({
        ...(address && { address }),
        ...(lastName && { lastName }),
        ...(isActive && { isActive }),
        ...(firstName && { firstName }),
        ...(phoneNumber && { phoneNumber }),
        ...(hashedPassword && { password: String(hashPassword) }),
      })
      .catch(() => {
        throw catchError("An error occured!", 500);
      });

    return res
      .status(200)
      .json(success("Profile updated successfully", { admin: newAdmin }));
  } catch (error) {
    next(error);
  }
};

export const count = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [users, orgs, posts, petitions, events, adverts, victories, shares] = await Promise.all([
      new UserService().count(),
      new OrgService().count(),
      new PostService().count(),
      new PetitionService().count(),
      new Eventservice().count(),
      new AdvertService().count(),
      new VictoryService().count(),
      new ShareService().count(),
    ])

    return res
        .status(200)
        .json(success("Admin Count", { users, orgs, posts, petitions, events, adverts, victories, shares }));
  } catch (error) {
    next(error)
  }
}

export const assign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, orgId, subId } = req.body;
    if(!userId || !orgId || !subId) catchError('Invalid values', 400)
    const result = await new AdminService('', '', '').assign(userId, orgId, subId)

    return res
        .status(201)
        .json(success("User assiged", { user: result }));
  } catch (error) {
    next(error)
  }
}

export const deleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const param = req.params.id
    const result = await new AdminService("", "", param).deleteAdmin()

    return res
        .status(201)
        .json(success("Admin Deleted", { admin: result }));
  } catch (error) {
    next(error)
  }
}

