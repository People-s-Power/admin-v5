import { Router } from 'express';
import {  deleteOrganization, editOrganization, organization, orgs } from './org.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';

const OrgRouter = Router()

OrgRouter.get('/', Authenticate, orgs)
OrgRouter.get('/:id', Authenticate, organization)
OrgRouter.post('/:id', Authenticate, editOrganization)
OrgRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deleteOrganization)

export default OrgRouter