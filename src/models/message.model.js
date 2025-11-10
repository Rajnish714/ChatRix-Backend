import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, default: null }, // For 1v1 chats
  groupId: { type: String, default: null },  // For group chats (later)
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Message = mongoose.model("Message", messageSchema);