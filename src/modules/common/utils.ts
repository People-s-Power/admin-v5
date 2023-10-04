import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";

import { AppError, CreateErr, AuthenticatedRequest, Token } from "../../types";
import { createHash215 } from "./hashing";
import AuthenticationService from "./HashToken";

const { SECRET } = process.env;

if (typeof SECRET !== "string") {
  throw new Error("ADD JW SECRET KEY TO ENV");
}

export const catchError: CreateErr = (
  message,
  code = 403,
  validations = null
) => {
  const err = new Error(message);
  // @ts-ignore
  err.code = code;
  // @ts-ignore
  err.validations = validations;
  return err;
};

export const generateToken = (params: object) => {
  const data = new AuthenticationService(params).encrypt();
  return jwt.sign({ identity: data }, SECRET);
};

export const success = (msg: string, data: any, meta?: object) => ({
  data,
  status: true,
  message: msg,
  ...(meta && { meta }),
});

export const staffPermission = (permission: string[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.admin)
      throw catchError("You do not have permission to use this route", 400);
    const { role } = req.admin;
    const userHasPermission = permission.find((item) => item.includes(role));

    if (!userHasPermission)
      throw catchError(
        "You do not have permission to perform this action",
        400
      );

    return next();
  };
};

export async function Authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw catchError("Authorization Header not provided!", 403);
    }

    const user = jwt.verify(token, SECRET) as { identity: string; exp: number };
    const data = new AuthenticationService(user.identity).decrypt();
    // console.log(data, 'dd');
    if ("role" in data) {
      req.admin = data;
      return next();
    }
    req.user = data;
    return next();
  } catch (e) {
    return next(e);
  }
}

export function errorHandler(
  error: AppError,
  req: any,
  res: Response,
  _next: any
) {
  try {
    if (error.validations) {
      return res.status(422).json({
        status: false,
        message: "All fields are required",
        data: error.validations,
      });
    }

    const code = error.code || 500;
    const msg = error.message;

    console.log(error.name || "Error", error.message);

    return res.status(code || 500).json({ status: false, message: msg });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: false });
  }
}

export const forwardRequest = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { app } = req;
  // eslint-disable-next-line no-underscore-dangle
  return app._router.handle(req, res, next);
};

export const validate = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const error = errors.array({ onlyFirstError: true })[0].msg as string;
    const position = errors.array({ onlyFirstError: true })[0].param as string;
    const extractedError = error.includes("Invalid value")
      ? `${error} at ${position}`
      : error;

    throw catchError(extractedError, 400);
  } catch (e) {
    return next(e);
  }
};

export const escapeSpecialCharacters = (text) => {
  /* eslint-disable */
  return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

export const extractObjects = <T>(obj: T) => {
  const arr = Object.keys(obj).map(item => [[item], obj[item]]);
  return Object.fromEntries(arr);
}

export const composeSearchParams = <T>(params: string) => {
  if(params) {
    return extractObjects<T>(JSON.parse(params));
  }

  return undefined;
}
