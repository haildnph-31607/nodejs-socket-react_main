import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    members: Array,
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Chat",chatSchema)