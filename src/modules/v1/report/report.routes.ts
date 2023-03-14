import { Router } from 'express';
import {  deleteReport, editReport, report, reports } from './report.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';

const reportRouter = Router()

reportRouter.get('/', Authenticate, reports)
reportRouter.get('/:id', Authenticate, report)
reportRouter.post('/:id', Authenticate, editReport)
reportRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deleteReport)

export default reportRouter