import { Router } from 'express';
import {  deleteEvent, editEvent, event, events } from './events.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';

const eventRouter = Router()

eventRouter.get('/', Authenticate, events)
eventRouter.get('/:id', Authenticate, event)
eventRouter.post('/:id', Authenticate, editEvent)
eventRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deleteEvent)

export default eventRouter