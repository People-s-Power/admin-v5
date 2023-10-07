import { Schema } from "mongoose"

import { db } from "../connection"
import { ITransaction, IWalletTransaction } from "../../types"

export enum IPaymentStatus {
  Pending = 'Pending',
  Failed = 'Failed',
  success = 'success',
  Refunded = 'Refunded',
  Declined = 'Declined'
}

const walletTransactionSchema: Schema = new Schema<IWalletTransaction>({
  userId: {
    type: String,
    required: true
  },
  walletId: {
    type: Schema.Types.ObjectId,
    ref: "wallets",
    required: true
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
  },
  currency: {
    type: String,
    required: [true, "currency is required"],
    enum: ["NGN", "USD", "EUR", "GBP"],
  },
  paymentMethod: {
    type: String,
  },
  status: { type: String, default: IPaymentStatus.Pending },
  isInflow: { type: Boolean, default: true }
},{
  autoIndex: true,
  versionKey: false,
  collection: "walletTransactions",
})


walletTransactionSchema.set('timestamps', true)

const WalletTransaction = db.model<IWalletTransaction>('WalletTransaction', walletTransactionSchema)