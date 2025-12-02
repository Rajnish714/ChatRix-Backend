//store online users and all socket ids for multi-tab support
export const onlineUser = new Map();

import { Chat } from "../../src/models/chat.model.js";

//auto join connect socket to all chatId so delivered msg work globally
export async function autoJoinUserChats(socket, userId) {
  const userChats = await Chat.find({ members: userId }).select("_id");

  userChats.forEach(chat => {
    socket.join(chat._id.toString());
  });
}
