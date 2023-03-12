import { Schema, Types } from "mongoose";

import { db } from "../connection";
import { IOrder } from "../../types";

const OrderSchema: Schema = new Schema<IOrder>(
  {
    fees: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["event", "shop"],
      default: "event",
      required: true,
    },
    gross: {
      type: Number,
    },
    total: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    unitPrice: {
      type: Number,
    },
    productItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        image: String,
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
        totalPrice: {
          type: Number,
        },
        color: {
          type: String,
        },
      },
    ],
    eventIds: [
      {
        type: Types.ObjectId,
        ref: "Event",
      },
    ],
    ticketId: {
      type: Types.ObjectId,
      ref: "Event",
    },
    billingId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["completed", "cancelled", "pending"],
      default: "pending",
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
    collection: "orders",
  }
);

OrderSchema.set("timestamps", true);

export default db.model<IOrder>("Order", OrderSchema);
