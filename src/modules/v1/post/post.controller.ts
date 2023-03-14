import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import PostService from "./post.service";

export const posts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, page, limit } = req.query

    const posts = await new PostService("", String(filter)).findAll(Number(limit), Number(page))
    

    return res
        .status(200)
        .json(success("Posts retrieved", { posts }));
  } catch (error) {
    next(error)
  }
}

export const post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const post = await new PostService(id ).findOne()
    

    return res
        .status(200)
        .json(success("Post retrieved", { post }));
  } catch (error) {
    next(error)
  }
}



export const editPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params


    const post = await new PostService(id ).updateOne(req.body)
    

    return res
        .status(200)
        .json(success("Post updated", { post }));
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const param = req.params.id
    const post = await new PostService(param).delete()

    return res
        .status(201)
        .json(success("Post Deleted", { post }));
  } catch (error) {
    next(error)
  }
}