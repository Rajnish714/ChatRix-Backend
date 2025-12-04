import { Chat } from "../models/chat.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";


export const getorCreatePrivateChatId=catchAsync(async (req, res, next) => {
   
    const {otherUserId}= req.body
    
   const myId = req.user.userId;

    if (!otherUserId) {
      return next(new AppError("otherUserId is required", 400));
    }
     let chat = await Chat.findOne({
      isGroup: false,
      members: { $all: [myId, otherUserId] },
    });

    if (!chat) {
      chat = await Chat.create({
        isGroup: false,
        members: [myId, otherUserId],
      });
    }

    res.status(200).json(chat);
    } 
    )

   export const createGroup=catchAsync(async (req, res, next) =>{

   const myId = req.user.userId;
    const { imageUrl,groupName,members } = req.body;
   
    if(!myId ){
      return next(new AppError("userId is required", 400));
    }
    
    if (!groupName) {
    return next(new AppError("Group name is required", 400));
  }
   const finalMembers = Array.isArray(members) ? members : [];
 
    const newGroup= await Chat.create({
      isGroup:true,
      createdBy:myId,
      admins:[myId],
      members: [myId, ...finalMembers],
      groupName,
      groupImage: imageUrl || undefined, 
      
    });

    res.status(201).json({message:"group created successfully",data:newGroup})
 
   })