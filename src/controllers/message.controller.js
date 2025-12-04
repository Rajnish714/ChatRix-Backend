import { Message } from "../models/message.model.js";
import AppError from "../utils/AppError.js"
import { catchAsync } from "../utils/catchAsync.js";


export const getMessages = catchAsync(async (req, res, next) => {
 
    const { chatId } = req.query;
   
    if (!chatId) {
      return  next(new AppError("chatId is required", 400));
    }

    const messages = await Message.find({ chatId })
      .populate("sender", "username")
      .sort({ createdAt: 1 });
   
 
    res.json(messages);

})
