import { User } from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
export const getUsers=catchAsync(async (req, res, next) => {

    const users = await User.find();

    if (!users || users.length === 0) {
      return next(new AppError("user not found", 404));
    }

    res.status(200).json(users);
 
})
