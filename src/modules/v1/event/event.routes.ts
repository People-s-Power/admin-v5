import { Router } from 'express';
import {  createEventProf, deleteEvent, deleteEventProf, editEvent, editEventProf, event, events } from './events.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';
import { createEventRule } from './event.validation';
import { findRule } from '../advert/advert.validation';

const eventRouter = Router()

eventRouter.get('/', Authenticate, findRule(), validate, events)
eventRouter.get('/:id', Authenticate, event)
eventRouter.post('/:id', Authenticate, editEvent)
eventRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deleteEvent)

// Prof
eventRouter.post('/', Authenticate, staffPermission(['Admin', 'Staff']), createEventRule(), validate, createEventProf)
eventRouter.patch('/prof/edit', Authenticate, editEventProf);
eventRouter.put('/delete-event', Authenticate, staffPermission(['Staff', 'Admin']), deleteEventProf)

export default eventRouter