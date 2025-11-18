import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, default: null }, 
  groupId: { type: String, default: null },  
  text: { type: String, required: true },
 
},{timestamps:true});

export const Message = mongoose.model("Message", messageSchema);