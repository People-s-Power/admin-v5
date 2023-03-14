import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import TxService from "./tx.service";

export const txs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, page, limit } = req.query

    const txs = await new TxService("", String(filter)).findAll(Number(limit), Number(page))
    

    return res
        .status(200)
        .json(success("Transactions retrieved", { transactions: txs }));
  } catch (error) {
    next(error)
  }
}

export const tx = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const transaction = await new TxService(id ).findOne()
    

    return res
        .status(200)
        .json(success("Transaction retrieved", { transaction }));
  } catch (error) {
    next(error)
  }
}



export const editTx = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params


    const transaction = await new TxService(id ).updateOne(req.body)
    

    return res
        .status(200)
        .json(success("transaction updated", { transaction }));
  } catch (error) {
    next(error)
  }
}

export const deleteTx = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const param = req.params.id
    const transaction = await new TxService(param).delete()

    return res
        .status(201)
        .json(success("transaction Deleted", { transaction }));
  } catch (error) {
    next(error)
  }
}