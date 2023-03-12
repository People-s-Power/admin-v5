import adminRouter from "./admin/admin.routes";
import { Authenticate } from "../common/utils";
import { Router, Response, NextFunction } from "express";

const router = Router();

router.use("/admin", adminRouter);
// router.use('/order', Authenticate, orderRouter);
// router.use('/exports', exportRouter);

router.use("/", async (_req, res: Response, _next: NextFunction) =>
  res.send("Welcome to People-pow admin API")
);

export default router;
