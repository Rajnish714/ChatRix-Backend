import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  isGroup: {
    type: Boolean,
    default: false,
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  groupName: {
    type: String,
    default: null,
    required: function(){
      return this.isGroup
    }
  },

  groupImage: {
    type: String,
    default: "https://api.dicebear.com/9.x/adventurer/svg?seed=Emery"
  },

createdBy:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required: function (){
    return this.isGroup
  }
 },

  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    default: null
  }

}, { timestamps: true });

export const Chat = mongoose.model("Chat", chatSchema);