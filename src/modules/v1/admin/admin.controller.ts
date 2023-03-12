import AdminService from "./admin.service";
import ErrorCodes from "../../common/errorCodes";
import { matchPassword } from "../../common/hashing";
import { AuthenticatedRequest } from "../../../types";
import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import { ObjectId } from "mongoose";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, lastName, password, firstName, phoneNumber } = req.body;
  try {
    const admin = await new AdminService(email, phoneNumber)
      .create({
        email,
        lastName,
        password,
        firstName,
        phoneNumber,
      })
      .catch((e) => {
        throw catchError(
          e === ErrorCodes.UserExists()
            ? "You already have an account"
            : "An error occured"
        );
      });

    return res.status(201).json(
      success("Account successfully created", {
        admin: new AdminService().getAdmin(admin),
      })
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const service = new AdminService(email);
    const admin = await service.findOne().catch((e) => {
      console.log(e);
      throw catchError("An error occured");
    });

    if (!admin) throw catchError("Email/Password is incorrect");
    if (!admin.isActive) throw catchError("Your account is suspended");

    const matched = matchPassword(password, admin.password);
    if (!matched) throw catchError("Email/Password is incorrect");

    // update lastlogged in
    // await service
    //   .updateOne({ lastLoggedIn: new Date().toISOString() })
    //   .catch((e) => {
    //     throw catchError(
    //       e.message === ErrorCodes.NotFound().code
    //         ? "Suspended post cannot login"
    //         : "An error occured"
    //     );
    //   });

    // generate token
    const token = generateToken({
      id: admin._id,
      email: admin?.email,
      phoneNumber: admin?.phoneNumber,
    });

    return res
      .status(200)
      .json(
        success(
          "Logged in successfully",
          { admin: service.getAdmin(admin) },
          { token }
        )
      );
  } catch (error) {
    next(error);
  }
};

export const profile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const email = req.admin?.email;
  const id =req.admin?.id;
  console.log(email, id);
  try {
    const admin = await new AdminService(email, "", id).findOne().catch(() => {
      throw catchError("An error occurred");
    });

    if (!admin || !admin.isActive) throw catchError("Invalid account");

    return res.status(200).json(
      success("Profile retrieved successfully", {
        admin: new AdminService().getAdmin(admin),
      })
    );
  } catch (error) {
    next(error);
  }
};

