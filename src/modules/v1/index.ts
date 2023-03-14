import adminRouter from "./admin/admin.route";
import { Authenticate } from "../common/utils";
import { Router, Response, NextFunction } from "express";
import userRouter from "./user/user.routes";
import petitionRouter from "./petition/petition.routes";
import OrgRouter from "./org/org.routes";

const router = Router();

router.use("/admin", adminRouter);
router.use('/user', userRouter)
router.use('/petition', petitionRouter)
router.use('/org', OrgRouter)

router.use("/", async (_req, res: Response, _next: NextFunction) =>
  res.send("Welcome to People-pow admin API")
);

export default router;
