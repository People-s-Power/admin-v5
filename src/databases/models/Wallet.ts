import { Schema, model } from 'mongoose';

import { db } from "../connection"
import { IWallet } from '../../types';

export enum WalletUserType {
  user = 'user',
  org = 'org'
}

const walletSchema:Schema = new Schema<IWallet>(
  {
    balance: { type: Number, default: 0 },
    userId: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: WalletUserType,
      required: true
    }
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "wallets",
  }
);

walletSchema.set('timestamps', true)

const Wallet = db.model<IWallet>('Wallet', walletSchema)

export default Wallet