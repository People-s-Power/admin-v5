import { Router } from 'express';
import {  deleteVictory, editVictory, victroy, victories, createVictoryProf, editVictoryProf, deleteVictoryProf } from './victory.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';
import { createVictoryRule } from './victory.validation';

const VictoryRouter = Router()

VictoryRouter.get('/', Authenticate, victories)
VictoryRouter.get('/:id', Authenticate, victroy)
VictoryRouter.post('/:id', Authenticate, editVictory)
VictoryRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deleteVictory)

// Prof
VictoryRouter.post('/', Authenticate, staffPermission(['Admin', 'Staff']), createVictoryRule(), validate, createVictoryProf)
VictoryRouter.patch('/prof/edit', Authenticate, editVictoryProf)
VictoryRouter.put('/delete-victory', Authenticate,  staffPermission(['Admin', 'Staff']), deleteVictoryProf)

export default VictoryRouter