import { Schema } from "mongoose";
import { db } from "../connection";
import { IReport } from "../../types";


const ReportSchema: Schema = new Schema<IReport>({
  body: {
    type: String,
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  itemType: {
    type: String,
    required: true
  },
  reportType: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  authorEmail: {
    type: String,
    required: true
  },
  authorImage: {
    type: String,
    required: true
  },
},{
  collection: "reports",
})

ReportSchema.set('timestamps', true)


export default db.model<IReport>('Report', ReportSchema)