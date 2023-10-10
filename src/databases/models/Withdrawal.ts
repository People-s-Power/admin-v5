import { Schema, model } from 'mongoose';

import { db } from "../connection"
import { IWithdraw } from '../../types';
import { IPaymentStatus } from './WalletTx';

const WithdrawalSchema: Schema = new Schema<IWithdraw>({
  account_bank: String,
  account_name: String,
  account_number: String,
  amount: Number,
  userId: String,
  status: {
    enum: IPaymentStatus,
    type: String
  },
  bank_code: String
}, {
  autoIndex: true,
  versionKey: false,
  collection: "withdraws",
})

WithdrawalSchema.set('timestamps', true)

const Withdraws = db.model<IWithdraw>('Wallet', WithdrawalSchema)

export default Withdraws