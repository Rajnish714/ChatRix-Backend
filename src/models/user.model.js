import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  socketId: { type: String },
});

export const User = mongoose.model("User", userSchema);