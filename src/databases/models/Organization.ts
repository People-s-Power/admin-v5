import { Schema } from "mongoose";
import { db } from "../connection";
import { IOrgnaization } from "../../types";

const OrgSchema: Schema = new Schema<IOrgnaization>({
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  followers: [
    {
    type: String,
    required: true
  },
  ],
  following: [
    {
    type: String,
    required: true
  },
  ],
  operators: [
    {
      type: String,
      required: true
    },
  ],
  isActive: {
    type: Boolean,
    default: false
  },
  facebook: {
    type: String,
    required: true
  },
  linkedIn: {
    type: String,
    required: true
  },
  instagram: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
},
{
  collection: "orgnaizations",
})

OrgSchema.set('timestamps', true)

export default db.model<IOrgnaization>('Organization', OrgSchema)