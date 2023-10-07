import { Router } from "express";
import { Authenticate, staffPermission, validate } from "../../common/utils";
import { getAll, getOne, getUassiged } from "./subscription.controller";

const subscriptionRouter = Router()


subscriptionRouter.get('/', Authenticate, staffPermission(['super-admin']), getAll)

subscriptionRouter.patch('/', Authenticate, staffPermission(['super-admin']), getOne)

subscriptionRouter.get('/unassiged', Authenticate, staffPermission(['super-admin']), getUassiged)

export default subscriptionRouter;