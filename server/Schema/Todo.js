import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", TodoSchema);
