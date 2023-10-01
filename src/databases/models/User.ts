import { Schema } from "mongoose";
import { db } from "../connection";
import { IUser } from "../../types";

export enum AccountTypeEnum {
  Campaigner = 'Campaigner',
  Admin = 'Admin',
  Editor = 'Editor',
  Staff = 'Staff',
  Applicant = 'Applicant',
  Contact = 'Contact',
}

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
  },
  accountType: {
    type: String,
    enum: AccountTypeEnum,
    default: AccountTypeEnum.Editor,
    required: true
  },
  image: {
    type: String,
  },
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
  description: {
    type: String,
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
  },
  address: {
    type: String,
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
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  lastSeen: {
    type: String,
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