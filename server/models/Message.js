import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Message",messageSchema)