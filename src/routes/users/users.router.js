 import express from "express"
 import { getUsers, searchUsers, updateMyProfile } from "../../controllers/user.controller.js"
 import { verifyAccessToken } from "../../midlleware/auth.middleware.js"
import { uploadImage } from "../../midlleware/upload.middleware.js"
 
 const usersRouter=express.Router()
    
 usersRouter.get("/",verifyAccessToken, getUsers)
  usersRouter.get("/search",verifyAccessToken, searchUsers)
usersRouter.post("/update-profile",verifyAccessToken,uploadImage.single("image"),updateMyProfile)
 export default usersRouter