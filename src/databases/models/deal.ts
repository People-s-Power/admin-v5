import { db } from "../connection";
import { Schema, Types } from "mongoose";
import { IDeals } from '../../types'

const DealSchema: Schema = new Schema<IDeals>({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId, ref: 'Product'
    }
  ],
  live: Boolean,
  percentage: {
    type: Number,
    required: true
  }
})

DealSchema.set('timestamps', true)

export default db.model<IDeals>('Deal', DealSchema)