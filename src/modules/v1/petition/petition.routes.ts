import { Router } from 'express';
import {  createPetitionProf, deletePetition, deletePetitionProf, editPetiton, editPetitonProf, petiton, petitons } from './petition.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';
import { createPetitionRule } from './petition.validation';

const petitionRouter = Router()

petitionRouter.get('/', Authenticate, petitons)
petitionRouter.get('/:id', Authenticate, petiton)
petitionRouter.post('/:id', Authenticate, editPetiton)
petitionRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deletePetition)

// prof
petitionRouter.post('/', Authenticate, staffPermission(['Admin', 'Staff']), createPetitionRule(), validate, createPetitionProf)
petitionRouter.patch('/prof/edit', Authenticate, editPetitonProf)
petitionRouter.put('/delete-petition', Authenticate, staffPermission(['Staff']), deletePetitionProf)

export default petitionRouter