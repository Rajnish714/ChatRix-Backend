 import { catchAsync } from "../utils/catchAsync.js";
 export const reload=catchAsync(async (req, res, next) =>{

    res.status(200).json({
    message: "reload success",
   
    }
   )
 })
