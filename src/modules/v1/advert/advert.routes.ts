import { Router } from 'express';
import {  deleteAdvert, editAdvert, advert, adverts, createAdvertProf, editAdvertProf, deleteAdvertProf } from './advert.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';
import { createAdvertRule, deleteAdvertRule } from './advert.validation';

const advertRouter = Router()

advertRouter.get('/', Authenticate, adverts)
advertRouter.get('/:id', Authenticate, advert)
advertRouter.post('/:id', Authenticate, editAdvert)
advertRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deleteAdvert)

// Prof
advertRouter.post('/', Authenticate, staffPermission(['Admin', 'Staff']), createAdvertRule(), validate, createAdvertProf)
advertRouter.patch('/prof/edit', Authenticate, editAdvertProf)
advertRouter.put('/delete-advert', Authenticate, staffPermission(['Staff']), deleteAdvertProf)

export default advertRouter