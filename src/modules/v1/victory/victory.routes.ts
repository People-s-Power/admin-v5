import { Router } from 'express';
import {  deleteVictory, editVictory, victroy, victories } from './victory.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';

const VictoryRouter = Router()

VictoryRouter.get('/', Authenticate, victories)
VictoryRouter.get('/:id', Authenticate, victroy)
VictoryRouter.post('/:id', Authenticate, editVictory)
VictoryRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deleteVictory)

export default VictoryRouter