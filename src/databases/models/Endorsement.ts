import { Schema, Types } from "mongoose";
import { db } from "../connection";
import { IEndorsement } from "../../types";


const EndorsementSchema: Schema = new Schema<IEndorsement>({
  author:{
    type: String,
    required: true
  },
  petition: { type: Types.ObjectId, ref: 'Petition' },
  likes: [{
    type: String,
    required: true
  },],
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String,
    required: true
  },
  likeCount: {
    type: Number,
    required: true
  },
},{
  collection: "endorsements",
})

EndorsementSchema.set('timestamps', true)


export default db.model<IEndorsement>('Endorsement', EndorsementSchema)