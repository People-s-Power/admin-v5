import { db } from "../connection";
import { IReview } from "../../types";
import { Schema, Types } from "mongoose";

const ReviewSchema: Schema = new Schema<IReview>(
  {
    rating: {
        type: Number,
        default: 0,
    },
    content: {
        type: String,
    },
    creatorResponse: {
        type: String,
    },
    reviewTypeId: {
        type: Types.ObjectId,
    },
    customer: {
        type: Types.ObjectId,
        ref: 'User'
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['listing', 'event', 'shop'],
        default: 'listing',
    },
    amenitiesRatings: {
        type: Object,
    },
    deletedAt: {
      type: String,
      default: null
    },
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "reviews",
  }
);

ReviewSchema.set("timestamps", true);

export default db.model<IReview>("Review", ReviewSchema);
