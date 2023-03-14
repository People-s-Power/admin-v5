import { Router } from 'express';
import {  deletePost, editPost, post, posts } from './post.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';

const postRouter = Router()

postRouter.get('/', Authenticate, posts)
postRouter.get('/:id', Authenticate, post)
postRouter.post('/:id', Authenticate, editPost)
postRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deletePost)

export default postRouter