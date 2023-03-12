import { db } from "../connection";
import { ICHECHOUT, IORDER, IReview } from "../../types";
import { Schema, Types } from "mongoose";


const checkoutSchema: Schema = new Schema<ICHECHOUT>({
  paid: {
    type: String,
    enum: ['Successful', 'Pending', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  billingId: {
    type: Schema.Types.ObjectId, ref: 'Billing'
  },
  amount: Number,
  orderId: {
    type: Schema.Types.ObjectId, ref: 'Order'
  },
  tx_ref: String
})

checkoutSchema.set('timestamps', true)

export default db.model<ICHECHOUT>('Checkout', checkoutSchema)