import { Chat } from "../models/chat.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { io } from "../../server.js";


export const getorCreatePrivateChatId=catchAsync(async (req, res, next) => {
   
    const {otherUserId}= req.body
    const myId = req.user.userId;

    if(!otherUserId) return next(new AppError("otherUserId is required", 400));
    
     let chat = await Chat.findOne({
      isGroup: false,
      members: { $all: [myId, otherUserId] },
    });

    if(!chat) {
      chat = await Chat.create({
        isGroup: false,
        members: [myId, otherUserId],
      });
    }
    res.status(200).json(chat);
    } 
    )

//--------------CREATE GROUP---------------------------------4
  
export const createGroup=catchAsync(async (req, res, next) =>{

   const myId = req.user.userId;
   const { imageUrl,groupName,members } = req.body;
   
    if(!myId ) return next(new AppError("userId is required", 400));
    if (!groupName) return next(new AppError("Group name is required", 400));
  
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

//--------------get my group ---------------------------------

export const getMyGroup=catchAsync(async (req, res, next) =>{
   const myId = req.user.userId;
      
  if(!myId ) return next(new AppError("userId is required", 400));
      
    const groups = await Chat.find({
    isGroup: true,
    members: { $in: [myId] }   
  })
  .populate("members", "username profilePic") 
  .populate("admins", "username")
  .sort({ updatedAt: -1 }); 

   if(!groups) return next(new AppError("groups not found", 404));
  
   res.json({ 
   message: "Groups fetched successfully",
   data: groups
   })
 })

//--------------Add group member---------------------------------

export const addGroupMember=catchAsync(async (req, res, next) =>{
    
    const { chatId } = req.query;
    const myId = req.user.userId;
    const {  members } = req.body;
  
    if(!myId ) return next(new AppError("userId is required", 400))
    if(!chatId || !members) return next(new AppError("chatId and members is required", 400));
 
    const group= await Chat.findById(chatId)
    if(!group) return next(new AppError("group not found", 404));
    
    if(!group.isGroup) return next(new AppError("Cannot add members to a 1v1 chat", 400));
    if(!group.admins.some(id => id.toString() === myId)) return next(new AppError("Only admins can add members", 403));
       
    const finalMembers = Array.isArray(members) ? members : [];
  
    const newMember=await Chat.findByIdAndUpdate(chatId, {
    $addToSet: { members: {$each: finalMembers} }},{new: true}
  ).populate("members", "username profilePic").populate("admins", "username")

    res.status(201).json({message:"members added successfully",data:newMember})
    io.to(chatId).emit("memberAdded", {chatId, member: newMember});
   })

//--------------Remove group member---------------------------------

export const removeGroupMember=catchAsync(async (req, res, next) =>{
    
    const { chatId } = req.query;
    const myId = req.user.userId;
    const {  members } = req.body;
  
    if(!myId ) return next(new AppError("userId is required", 400))
    if(!chatId || !members) return next(new AppError("chatId and members is required", 400));
 
    const group = await Chat.findById(chatId)
    if(!group) return next(new AppError("group not found", 404));
    
    if(!group.isGroup) return next(new AppError("Cannot add members to a 1v1 chat", 400));
    if(!group.admins.some(id => id.toString() === myId)) return next(new AppError("Only admins can removes members", 403));
       
    const finalMembers = Array.isArray(members) ? members : [];

    const existingMembers = finalMembers.filter(memberId =>
    group.members.map(m => m.toString()).includes(memberId)
     );

    if (existingMembers.length === 0) {
    return next(new AppError("None of the provided members exist in this group", 400));
     }
  
    const updatedGroup = await Chat.findByIdAndUpdate(chatId, {
    $pull: { members: {$in: finalMembers} }},
    {new: true}).populate("members", "username profilePic").populate("admins", "username");

    res.status(201).json({message:"members removed successfully",data:updatedGroup})
    io.to(chatId).emit("memberRemoved", {chatId, removed: finalMembers});
   })