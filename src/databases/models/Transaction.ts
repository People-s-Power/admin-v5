import { Schema } from "mongoose";
import { db } from "../connection";
import { ITransaction } from "../../types";


const TxSchema: Schema = new Schema<ITransaction>({
  message: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  transaction: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  transactionId: {
    type: Number,
    required: true
  },
  paid_at: {
    type: String,
    required: true
  },
  created_at: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
},{
  collection: "transactions",
})

TxSchema.set('timestamps', true)

export default db.model<ITransaction>('Transaction', TxSchema)