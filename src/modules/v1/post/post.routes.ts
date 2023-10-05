import { Router } from 'express';
import {  createPostProf, deletePost, deletePostProf, editPost, editPostProf, post, posts } from './post.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';
import { createPostRule } from './post.validation';

const postRouter = Router()

postRouter.get('/', Authenticate, posts)
postRouter.get('/:id', Authenticate, post)
postRouter.post('/:id', Authenticate, editPost)
postRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deletePost)

// Prof

postRouter.post('/', Authenticate, staffPermission(['Admin', 'Staff']), createPostRule(), validate, createPostProf)
postRouter.patch('/prof/edit', Authenticate, editPostProf)
postRouter.put('/delete-post', Authenticate, staffPermission(['Staff']), deletePostProf)

export default postRouter