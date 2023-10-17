import { Router } from "express";
import { Authenticate, staffPermission, validate } from "../../common/utils";
import { becomeRule, createUserRule, editPasswordRule, editRule, loginRule, reviewRule, updateTaskRule } from "./auth.validation";
import { become, create, createReview, edit, fetchActivities, getReviews, getTasks, login, updatePassword, updateTask } from "./auth.controller";
import { findRule } from "../advert/advert.validation";

const authRouter = Router();

authRouter.post('/', createUserRule(), validate, create);

authRouter.post('/login', loginRule(), validate, login);

authRouter.post('/become', becomeRule(), validate, become);

authRouter.patch('/edit', Authenticate, editRule(), validate, edit);

authRouter.put('/edit', Authenticate, editPasswordRule(), validate, updatePassword);

authRouter.patch('/activities', Authenticate, fetchActivities)

authRouter.get('/task', Authenticate, findRule(), validate, getTasks)

authRouter.post('/task/:id', Authenticate, updateTaskRule(), validate, updateTask)

authRouter.get('/review', Authenticate, findRule(), validate, getReviews)

authRouter.post('/review', Authenticate, reviewRule(), validate, createReview)

export default authRouter;