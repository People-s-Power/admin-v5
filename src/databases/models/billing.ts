import { db } from "../connection";
import { IBILLING, IReview } from "../../types";
import { Schema, Types } from "mongoose";

const BillingSchema: Schema = new Schema<IBILLING>(
  {
    userId: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    billing: {
      fullName: {
        type: String,
        default: '....'
      },
      email: {
        type: String,
        default: '....'
      },
      country: {
        type: String,
        default: '....'
      },
      town: {
        type: String,
        default: '....'
      },
      street: {
        type: String,
        default: '....'
      },
      company: {
        type: String,
        default: '....'
      },
      phone: {
        type: Number,
        default: 0
      },
      postCode: {
        type: Number,
        default: 0
      },
    },
    delivery: {
      fullName: {
        type: String,
        default: '....'
      },
      email: {
        type: String,
        default: '....'
      },
      country: {
        type: String,
        default: '....'
      },
      town: {
        type: String,
        default: '....'
      },
      street: {
        type: String,
        default: '....'
      },
      company: {
        type: String,
        default: '....'
      },
      phone: {
        type: Number,
        default: 0
      },
      postCode: {
        type: Number,
        default: 0
      },
    }
  }
)

BillingSchema.set("timestamps", true);

export default db.model<IBILLING>("Billing", BillingSchema);