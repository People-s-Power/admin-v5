import { Request, Response, NextFunction } from "express";
import { catchError, success } from "../../common/utils";
import WithdrawService from "./withdraw.service";
import { finalize_transfer } from "../../common/paystack";

export const fetchWithdrawalRequests =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, page, limit, status } = req.query

    const data = await new WithdrawService('','').find(Number(page), Number(limit), String(filter), {status: status})

    return res
        .status(200)
        .json(success("Withdraw requests retrieved", { data }));
  } catch (error) {
    next(error)
  }
}

export const approve =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { withdrawId } = req.body

    const data = await new WithdrawService('','').transfer(withdrawId)
    return res
        .status(201)
        .json(success("Enter OTP", { data }));
  } catch (error) {
    next(error)
  }
}

export const otp =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp, transfer_code } = req.body

    const data = await finalize_transfer(transfer_code, otp)

    return res
          .status(201)
          .json(success("Transfer Sent", { data }));
  } catch (error) {
    console.log(error)
    next(error)
  }
}