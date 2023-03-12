import { Schema, Types } from "mongoose";
import { db } from "../connection";
import { IView } from "../../types";

const ViewSchema: Schema = new Schema<IView>(
  {
    eventId: {
      type: Types.ObjectId,
      ref: "Event",
    },
    listingId: {
      type: Types.ObjectId,
      ref: "Listing",
    },
    productId: {
      type: Types.ObjectId,
      ref: "Product",
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    platform: {
      type: String,
      enum: ["web", "ios", "android"],
      default: "web",
    },
    deletedAt: {
      type: String,
      default: null,
    },
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "views",
  }
);

ViewSchema.set("timestamps", true);

export default db.model<IView>("View", ViewSchema);
