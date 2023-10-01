import { Router } from "express";
import { Authenticate, staffPermission, validate } from "../../common/utils";
import { createUserRule, loginRule } from "./auth.validation";
import { create, login } from "./auth.controller";

const authRouter = Router();

authRouter.post('/', createUserRule(), validate, create);

authRouter.post('/login', loginRule(), validate, login);

export default authRouter;