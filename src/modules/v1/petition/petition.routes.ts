import { Router } from 'express';
import {  deletePetition, editPetiton, petiton, petitons } from './petition.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';

const petitionRouter = Router()

petitionRouter.get('/', Authenticate, petitons)
petitionRouter.get('/:id', Authenticate, petiton)
petitionRouter.post('/:id', Authenticate, editPetiton)
petitionRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deletePetition)

export default petitionRouter