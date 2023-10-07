import { Schema, model } from 'mongoose';

import { db } from "../connection"
import { ISubscription } from '../../types';

export enum DurationEnum {
  TRIAL = 'TRIAL',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

const SubScriptionSchema: Schema = new Schema<ISubscription>({
  autoRenew: Boolean,
  assignedProf: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "orgnaizations",
  },
  amount: Number,
  duration: {
    type: String,
    enum: DurationEnum
  },
  grace: Boolean,
  expired: Boolean,
},{
  autoIndex: true,
  versionKey: false,
  collection: "subscriptionprofs",
})


SubScriptionSchema.set('timestamps', true)

const Subscriptionprof = db.model<ISubscription>('Subscriptionprof', SubScriptionSchema)
export default Subscriptionprof;