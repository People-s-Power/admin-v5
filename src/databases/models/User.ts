import { Schema } from "mongoose";
import { db } from "../connection";
import { IUser } from "../../types";

const userSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  emailToken: {
    type: String,
    required: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  accountName: {
    type: String,
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  lastSeen: {
    type: String,
    required: true
  },
  followers: [
    {
      type: String,
    }
  ],
  following: [{
    type: String,
  }],
  orgOperating: [
    {
      type: String,
    }
  ],
  createdOrg: {
    type: Boolean,
    required: true
  },
  interests: [{
    type: String,
  }]
},
{
  collection: "users",
})

userSchema.set("timestamps", true)

export default db.model<IUser>('User', userSchema)