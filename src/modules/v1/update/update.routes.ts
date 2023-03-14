import { Router } from 'express';
import {  deleteUpdate, editUpdate, update, updates } from './update.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';

const updateRouter = Router()

updateRouter.get('/', Authenticate, updates)
updateRouter.get('/:id', Authenticate, update)
updateRouter.post('/:id', Authenticate, editUpdate)
updateRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deleteUpdate)

export default updateRouter