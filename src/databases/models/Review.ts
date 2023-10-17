import { Schema, Types } from "mongoose";
import { db } from "../connection";
import { IReview } from "../../types";

const ReviewSchema: Schema = new Schema<IReview>({
  body: String,
  rating: Number,
  userId: String,
  author: String
},{
  collection: "reviews",
})

ReviewSchema.set('timestamps', true)

export default db.model<IReview>('Review', ReviewSchema)
