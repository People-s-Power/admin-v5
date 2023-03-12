import { db } from "../connection";
import { ITicket } from "../../types";
import { Schema, Types } from "mongoose";

const TicketSchema: Schema = new Schema<ITicket>(
  {
    name: {
        type: String,
    },
    amount: {
        type: Number,
    },
    isPaid: {
        type: Boolean,
    },
    endDate: {
        type: String,
    },
    eventId: {
        type: Types.ObjectId,
        ref: 'Event'
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    timezone: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    startDate: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    visibility: {
        type: Boolean,
    },
    description: {
        type: String
    },
    minimumSellingQuantity: {
        type: Number,
    },
    maximumSellingQuantity: {
        type: Number,
    },
    deletedAt: {
      type: String,
      default: null
    },
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "tickets",
  }
);

TicketSchema.set("timestamps", true);

export default db.model<ITicket>("Ticket", TicketSchema);
