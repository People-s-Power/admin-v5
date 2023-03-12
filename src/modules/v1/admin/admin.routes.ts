import { Router } from 'express';
import { loginRule, signUpRule } from './user.validation';
import { login, profile, signUp } from './admin.controller';
import { Authenticate, validate } from '../../common/utils';

const adminRouter = Router();

adminRouter.get('/profile', Authenticate, profile);
// adminRouter.get('/dashboard', Authenticate, dashboard);
adminRouter.post('/', signUpRule(), validate, signUp);
adminRouter.post('/login', loginRule(), validate, login);

export default adminRouter;
