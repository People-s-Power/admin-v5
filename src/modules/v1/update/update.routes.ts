import { Router } from 'express';
import {  createUpdateProf, deleteUpdate, deleteUpdateProf, editUpdate, editUpdateProf, update, updates } from './update.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';
import { createUpdateRule } from './update.validation';

const updateRouter = Router()

updateRouter.get('/', Authenticate, updates)
updateRouter.get('/:id', Authenticate, update)
updateRouter.post('/:id', Authenticate, editUpdate)
updateRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deleteUpdate)

// Prof 
updateRouter.post('/', Authenticate, staffPermission(['Admin', 'Staff']), createUpdateRule(), validate, createUpdateProf)
updateRouter.patch('/prof/edit', Authenticate, editUpdateProf)
updateRouter.put('/delete-update', Authenticate, staffPermission(['Admin', 'Staff']), deleteUpdateProf)

export default updateRouter