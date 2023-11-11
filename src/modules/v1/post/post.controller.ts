import { Request, Response, NextFunction } from "express";
import { catchError, generateToken, success } from "../../common/utils";
import PostService from "./post.service";
import ProfService from "../auth/prof.service";

export const posts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { filter, page, limit, authorId } = req.query

    if (String(authorId) === 'undefined') {
      authorId = null
    }

    const author = authorId

    const posts = await new PostService("", String(filter)).findAll(Number(limit), Number(page), author)
    

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


export const createPostProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const {
      orgId,
      body,
      assets,
      categories
    } = req.body

    await new ProfService(id).checkUser(orgId);

    const post = await new PostService('').create({
      body,
      assets,
      categories,
      author: orgId
    })

    await new ProfService('').enterActivity('CREATE', id, orgId, ` created a post`, 'POST')

    return res
        .status(201)
        .json(success("Post created successfully", { post }));
  } catch (error) {
    next(error)
  }
}


export const editPostProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const { orgId, postId } = req.body
    await new ProfService(id).checkUser(orgId);
    let post = await new PostService(postId).findOne()

    if(post.author !== orgId) throw catchError('Not Allowed', 400)
    
    post = await new PostService(postId).updateOne(req.body)

    await new ProfService('').enterActivity('EDIT', id, orgId, ` edited a post`, 'POST')

    return res
        .status(200)
        .json(success("Post updated", { post }));
  } catch (error) {
    next(error)
  }
}

export const deletePostProf =async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.admin.id
    const { orgId, postId } = req.body
    await new ProfService(id).checkUser(orgId);
    let post = await new PostService(postId).findOne()

    if(post.author !== orgId) throw catchError('Not Allowed', 400)

    post = await new PostService(postId).delete()
    await new ProfService('').enterActivity('DELETE', id, orgId, ` deleted a post`, 'POST')


    return res
        .status(200)
        .json(success("POST Deleted", { post }));

  } catch (error) {
    next(error)
  }
}