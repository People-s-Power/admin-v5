import { Router } from 'express';
import {  deleteTx, editTx, tx, txs } from './tx.controller';
import { Authenticate, staffPermission, validate } from '../../common/utils';

const txRouter = Router()

txRouter.get('/', Authenticate, txs)
txRouter.get('/:id', Authenticate, tx)
txRouter.post('/:id', Authenticate, staffPermission(['super-admin']), editTx)
txRouter.delete('/:id', Authenticate, staffPermission(['super-admin']), deleteTx)

export default txRouter