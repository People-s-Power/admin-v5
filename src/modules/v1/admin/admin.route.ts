import { Router } from "express";
import { Authenticate, staffPermission, validate } from "../../common/utils";
import { addAdmin, editProfile, login, profile , deleteAdmin, count, sendMessage, assign} from "./admin.controller";
import { addAdminRule, sendDmValidation, editProfileRule, loginRule, assignRule } from "./admin.validation";

const adminRouter = Router();

adminRouter.post('/', addAdminRule(), validate, addAdmin);
adminRouter.post('/login', loginRule(), validate, login);
adminRouter.route('/profile')
    .get(Authenticate, profile)
    .put(Authenticate, editProfileRule(), validate, editProfile);


adminRouter
    .get('/count', Authenticate, count)
    .post('/send-message', Authenticate, sendDmValidation(), validate, sendMessage)


adminRouter.post('/assign', Authenticate, staffPermission(['super-admin']), assign)


adminRouter.delete('/delete/:id', Authenticate, staffPermission(['super-admin']), deleteAdmin)




export default adminRouter