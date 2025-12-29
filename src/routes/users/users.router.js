 import express from "express"
 import { getUsers, searchUsers } from "../../controllers/user.controller.js"
 import { verifyAccessToken } from "../../midlleware/auth.middleware.js"
 
 const usersRouter=express.Router()
    
 usersRouter.get("/",verifyAccessToken, getUsers)
  usersRouter.get("/search",verifyAccessToken, searchUsers)

 export default usersRouter