import { Router } from "express";
import { Authenticate, staffPermission, validate } from "../../common/utils";
import { becomeRule, createUserRule, editPasswordRule, editRule, loginRule } from "./auth.validation";
import { become, create, edit, login, updatePassword } from "./auth.controller";

const authRouter = Router();

authRouter.post('/', createUserRule(), validate, create);

authRouter.post('/login', loginRule(), validate, login);

authRouter.post('/become', becomeRule(), validate, become);

authRouter.patch('/edit', Authenticate, editRule(), validate, edit);

authRouter.put('/edit', Authenticate, editPasswordRule(), validate, updatePassword);

export default authRouter;