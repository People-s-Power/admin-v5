import { Schema, Types } from "mongoose";

import { db } from "../connection";
import { IPayment } from "../../types";

const PaymentSchema: Schema = new Schema<IPayment>(
  {
    fees: {
      type: Number,
    },
    amount: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    orderId: {
      type: Types.ObjectId,
      ref: "Order",
    },
    type: {
      type: String,
      enum: ["event", "shop"],
      default: "event",
      required: true,
    },
    reference: {
      type: String,
    },
    method: {
      type: String,
      enum: ["bankTransfer", "cashOnDelivery", "payWithCard"],
      default: "payWithCard",
      required: true,
    },
    deletedAt: {
      type: String,
      default: null,
    },
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "payments",
  }
);

PaymentSchema.set("timestamps", true);

export default db.model<IPayment>("Payment", PaymentSchema);
