import { Schema, Types } from "mongoose";
import { db } from "../connection";
import { ITask } from "../../types";

const TaskSchema: Schema = new Schema<ITask>({
  name: String,
  dueDate: String,
  dueTime: String,
  author: String,
  prof: String,
  assigne: [
    {
      type: String
    }
  ],
  status: String,
},{
  collection: "tasks",
})

TaskSchema.set('timestamps', true)

export default db.model<ITask>('Task', TaskSchema)
