import { Router } from 'express';
import {  deleteAdvert, editAdvert, advert, adverts } from './advert.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';

const advertRouter = Router()

advertRouter.get('/', Authenticate, adverts)
advertRouter.get('/:id', Authenticate, advert)
advertRouter.post('/:id', Authenticate, editAdvert)
advertRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deleteAdvert)

export default advertRouter