import { Schema, model } from 'mongoose';

import { db } from "../connection"
import { IWallet } from '../../types';

export enum WalletUserType {
  user = 'user',
  org = 'org'
}

const walletSchema:Schema = new Schema<IWallet>(
  {
    balance: Number,
    userId: String,
    userType: String
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "wallets",
  }
);

walletSchema.set('timestamps', true)

const Wallet = db.model<IWallet>('wallets', walletSchema)

export default Wallet