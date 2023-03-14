import { Router } from 'express';
import {  deleteShare, editShare, share, shares } from './share.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';

const shareRouter = Router()

shareRouter.get('/', Authenticate, shares)
shareRouter.get('/:id', Authenticate, share)
shareRouter.post('/:id', Authenticate, editShare)
shareRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deleteShare)

export default shareRouter