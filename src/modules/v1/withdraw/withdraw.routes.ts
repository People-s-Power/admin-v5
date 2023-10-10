import { Router } from 'express';
import { Authenticate, staffPermission, validate } from '../../common/utils';
import { approve, fetchWithdrawalRequests, otp } from './withdraw.controller';
import { OtpRule } from './withdraw.validation';

const withdrawRouter = Router()


withdrawRouter.get('/', Authenticate, staffPermission(['super-admin']), fetchWithdrawalRequests)

withdrawRouter.post('/', Authenticate, staffPermission(['super-admin']), approve)

withdrawRouter.post('/otp', Authenticate, staffPermission(['super-admin']), OtpRule(), validate, otp)

export default withdrawRouter