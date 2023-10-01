import adminRouter from "./admin/admin.route";
import { Router, Response, NextFunction } from "express";
import userRouter from "./user/user.routes";
import petitionRouter from "./petition/petition.routes";
import OrgRouter from "./org/org.routes";
import postRouter from "./post/post.routes";
import eventRouter from "./event/event.routes";
import advertRouter from "./advert/advert.routes";
import VictoryRouter from "./victory/victory.routes";
import updateRouter from "./update/update.routes";
import shareRouter from "./share/share.routes";
import reportRouter from "./report/report.routes";
import txRouter from "./transaction/tx.routes";
import authRouter from "./auth/auth.routes";

const router = Router();

router.use("/admin", adminRouter);
router.use('/user', userRouter)
router.use('/petition', petitionRouter)
router.use('/org', OrgRouter)
router.use('/post', postRouter)
router.use('/event', eventRouter)
router.use('/advert', advertRouter)
router.use('/victory', VictoryRouter)
router.use('/update', updateRouter)
router.use('/share', shareRouter)
router.use('/report', reportRouter)
router.use('/tx', txRouter)
router.use('/auth', authRouter)

router.use("/", async (_req, res: Response, _next: NextFunction) =>
  res.send("Welcome to People-pow admin API")
);

export default router;
