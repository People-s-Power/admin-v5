import { Router } from 'express';
import {  deleteUser, singleUser, users } from './user.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';

const userRouter = Router();

userRouter.get('/', Authenticate, users);
userRouter.get('/single/:id', Authenticate, singleUser);
userRouter.delete('/delete/:id', Authenticate, staffPermission(['super-admin']), deleteUser)



export default userRouter;
