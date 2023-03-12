import { db } from "../connection";
import { IEvent } from "../../types";
import { Schema, Types } from "mongoose";

const EventSchema: Schema = new Schema<IEvent>(
  {
    type: {
      type: String,
    },
    city: {
      type: String,
    },
    title: {
      type: String,
      unique: true,
    },
    state: {
      type: String,
    },
    venue: {
      type: String,
    },
    tags: {
      type: [String],
    },
    endDate: {
      type: String,
    },
    startDate: {
      type: String,
    },
    country: {
      type: String,
    },
    summary: {
      type: String,
    },
    timezone: {
      type: String,
    },
    category: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    postalCode: {
      type: String,
    },
    eventImage: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    isRecurring: {
      type: Boolean,
    },
    organizerBio: {
      type: String,
    },
    organizerLogo: {
      type: String,
    },
    organizerName: {
      type: String,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    ticketId: {
      type: [Types.ObjectId],
      ref: "Ticket",
    },
    bannerPhoto: {
      type: [String],
    },
    organizerWebsite: {
      type: String,
    },
    ticketSold: {
      type: Number,
    },
    totalReview: {
      type: Number,
      default: 0,
    },
    averageReview: {
      type: Number,
      default: 0.0,
    },
    gross: {
      type: Number,
    },
    deletedAt: {
      type: String,
      default: null,
    },
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "events",
  }
);

EventSchema.set("timestamps", true);

export default db.model<IEvent>("Event", EventSchema);
